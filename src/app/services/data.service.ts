import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NamedAPIResourceList } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  // @TODO: document below
  public getPokemons(
    limit: number,
    offset: number
  ): Observable<NamedAPIResourceList> {
    return this.http.get<NamedAPIResourceList>(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
  }

  // @TODO: document below
  public getPokemon(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
}
