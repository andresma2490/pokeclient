import { Component, OnInit } from '@angular/core';
import { switchMap, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemonList$ = this.pokemonService.pokemonList$;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonList$
      .pipe(
        take(1),
        switchMap((pokemonList) => {
          return pokemonList.length === 0
            ? this.pokemonService.getPokemonList()
            : of(null);
        })
      )
      .subscribe();
  }

  onScroll() {
    this.pokemonService.getPokemonList().subscribe();
  }
}
