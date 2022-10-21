import { Component, OnInit } from '@angular/core';
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

  constructor(private movieService: MovieService) {}

  show() {
    this.showing = 'block';
  }

  hide() {
    this.showing = 'hidden';
  }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }

  movies: Title[] = [];

  searchMovies() {
    if (this.query.length > 0) {
      this.movieService.searchMovies(this.query).subscribe((movies) => {
        console.log(movies);
        this.movies = movies.map((movie) => movie.show);
      });
    } else {
      this.movieService.getMovies().subscribe((movies) => {
        this.movies = movies;
      });
    }
    return false;
  }
}
