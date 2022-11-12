import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemons',
    pathMatch: 'full',
  },
  {
    path: 'pokemons',
    loadChildren: () =>
      import('./pokemon/pages/pokemon-list/pokemon-list.module').then(
        (m) => m.PokemonListModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
