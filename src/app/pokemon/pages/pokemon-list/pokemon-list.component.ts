import { Component, OnInit } from '@angular/core';

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
    this.pokemonService.getPokemonList().subscribe();
  }

  onScroll() {
    this.pokemonService.getPokemonList().subscribe();
  }
}
