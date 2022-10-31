import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from '../models/title';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  api_key = '148b7c8a2f0e646cffebe4d74d6cdf1e';
  headers = {
    'X-RapidAPI-Key': 'e0d1d577bemsh06721df7e9028fbp16c1a8jsn9bf5b16547a1',
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
  };
  constructor(private httpClient: HttpClient) {}

  getMovies(page: number): Observable<Title[]> {
    return this.httpClient.get<Title[]>(
      `https://api.tvmaze.com/shows?page=${page}`
    );
  }

  searchMovies(query: string): Observable<Title[]> {
    return this.httpClient.get<Title[]>(
      `https://api.tvmaze.com/search/shows?q=${query}`
    );
  }
}
