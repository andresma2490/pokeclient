import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { environment } from '@environments/environment';
import { PokemonService } from '@app/pokemon/services/pokemon.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private baseUrl: string = `${environment.API_URL}/${environment.API_VERSION}`;
  searchForm = new FormGroup({
    nameOrId: new FormControl<string>(''),
  });

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {}

  searchPokemon() {
    const { nameOrId } = this.searchForm.value;

    if (nameOrId) {
      this.pokemonService
        .getPokemon(`${this.baseUrl}/pokemon/${nameOrId}`)
        .subscribe({
          next: (pokemon) => this.pokemonService.setPokemonList([pokemon]),
        });
    } else {
      this.pokemonService.pokemonListUrl = `${environment.API_URL}/${environment.API_VERSION}/pokemon`;
      this.pokemonService.setPokemonList([]);
      this.pokemonService.getPokemonList().subscribe();
    }
  }
}
