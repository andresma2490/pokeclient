import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, forkJoin, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Paginator, Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl: string = `${environment.API_URL}/${environment.API_VERSION}`;
  private pokemonList = new BehaviorSubject<Pokemon[]>([]);
  pokemonList$ = this.pokemonList.asObservable();
  pokemonListUrl: string | null = `${this.baseUrl}`;

  constructor(private http: HttpClient) {}

  setPokemonList(pokemonList: Pokemon[]) {
    this.pokemonList.next(pokemonList);
  }

  getPokemonList() {
    return this.http.get<Paginator>(this.pokemonListUrl!).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          document.getElementById('openAlertModalButton')?.click();
        }
        return throwError(() => error);
      }),
      tap((res) => (this.pokemonListUrl = res.next)),
      map((res) => {
        return res.results.map((obj) => this.getPokemon(null, obj.url));
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

  getPokemon(nameOrId: string | null, url: string | null = null) {
    if (!url) url = `${this.baseUrl}/pokemon/${nameOrId}`;
    return this.http.get<Pokemon>(url);
  }
}
