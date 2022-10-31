import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from 'src/app/models/title';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showing = 'hidden';
  query = '';
  page = 0;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  show() {
    this.showing = 'block';
  }

  hide() {
    this.showing = 'hidden';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((v) => {
      if (v['page']) {
        const page = parseInt(v['page']);
        console.log(page);
        if (typeof page === 'number' && page >= 0) {
          this.page = page;
        }
      }
      this.movieService.getMovies(this.page).subscribe((movies) => {
        this.movies = movies;
      });
    });
  }

  movies: Title[] = [];

  nextPage() {
    const page = this.page;
    this.router.navigate([''], {
      queryParams: {
        page: page + 1,
      },
    });
  }

  previousPage() {
    const page = this.page;
    if (page <= 0) {
      return;
    }
    this.router.navigate([''], {
      queryParams: {
        page: page - 1,
      },
    });
  }

  searchMovies() {
    if (this.query.length > 0) {
      this.movieService.searchMovies(this.query).subscribe((movies) => {
        console.log(movies);
        this.movies = movies.map((movie) => movie.show);
      });
    } else {
      const page = this.page;
      if (!page) {
        return;
      }
      this.movieService.getMovies(page).subscribe((movies) => {
        this.movies = movies;
      });
    }
    return false;
  }
}
