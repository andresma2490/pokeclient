import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PokemonService } from '@app/pokemon/services/pokemon.service';
import { Pokemon } from '@app/pokemon/models/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon!: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    let params$ = this.route.params;
    params$
      .pipe(
        switchMap((params) =>
          this.pokemonService.getPokemon(params['pokemonId'])
        ),
        tap((pokemon) => {
          this.pokemon = pokemon;
        }),
        switchMap((pokemon) =>
          this.pokemonService.getPokemon(null, pokemon.species.url)
        ),
        tap((species: any) => {
          let flavorTextObj = species?.flavor_text_entries.find(
            (item: any) => item.language.name === 'en'
          );
          this.pokemon.description = flavorTextObj?.flavor_text.replace(
            /[\n\r\f]/g,
            ''
          );
        })
      )
      .subscribe();
  }
}
