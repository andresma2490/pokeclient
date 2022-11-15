import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { environment } from '@environments/environment';
import { AuthService } from '@app/auth/services/auth.service';
import { PokemonService } from '@app/pokemon/services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn$ = this.authService.isLoggedIn$;
  searchForm = new FormGroup({
    nameOrId: new FormControl<string>(''),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {}

  searchPokemon() {
    const { nameOrId } = this.searchForm.value;

    if (nameOrId) {
      this.pokemonService.getPokemon(nameOrId).subscribe({
        next: (pokemon) => this.pokemonService.setPokemonList([pokemon]),
      });
    } else {
      this.pokemonService.pokemonListUrl = `${environment.API_URL}/${environment.API_VERSION}/pokemon`;
      this.pokemonService.setPokemonList([]);
      this.pokemonService.getPokemonList().subscribe();
    }
    this.router.navigate(['/']);
  }

  logout() {
    this.authService.logout();
  }
}
