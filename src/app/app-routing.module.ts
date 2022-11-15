import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemon',
    pathMatch: 'full',
  },
  {
    path: 'pokemon',
    loadChildren: () =>
      import('./pokemon/pages/pokemon-list/pokemon-list.module').then(
        (m) => m.PokemonListModule
      ),
  },
  {
    path: 'pokemon/:pokemonId',
    loadChildren: () =>
      import('./pokemon/pages/pokemon-detail/pokemon-detail.module').then(
        (m) => m.PokemonDetailModule
      ),
  },
  {
    path: 'auth/login',
    loadChildren: () =>
      import('./auth/pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'auth/register',
    loadChildren: () =>
      import('./auth/pages/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () =>
      import('./page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
