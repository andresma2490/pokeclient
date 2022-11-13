import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Paginator, Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokemonList = new BehaviorSubject<Pokemon[]>([]);
  pokemonList$ = this.pokemonList.asObservable();
  pokemonListUrl:
    | string
    | null = `${environment.API_URL}/${environment.API_VERSION}/pokemon`;

  constructor(private http: HttpClient) {}

  setPokemonList(pokemonList: Pokemon[]) {
    this.pokemonList.next(pokemonList);
  }

  getPokemonList() {
    return this.http.get<Paginator>(this.pokemonListUrl!).pipe(
      tap((res) => (this.pokemonListUrl = res.next)),
      map((res) => {
        return res.results.map((obj) => this.getPokemon(obj.url));
      }),
      switchMap((list$) => {
        return forkJoin(list$).pipe(
          tap((pokemonList) =>
            this.setPokemonList([...this.pokemonList.value, ...pokemonList])
          )
        );
      })
    );
  }

  getPokemon(url: string) {
    return this.http.get<Pokemon>(url);
  }
}
