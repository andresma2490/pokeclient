import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from './auth/guards/is-logged-in.guard';
import { IsLoggedOutGuard } from './auth/guards/is-logged-out.guard';

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
    canActivate: [IsLoggedInGuard],
    loadChildren: () =>
      import('./pokemon/pages/pokemon-detail/pokemon-detail.module').then(
        (m) => m.PokemonDetailModule
      ),
  },
  {
    path: 'auth/login',
    canActivate: [IsLoggedOutGuard],
    loadChildren: () =>
      import('./auth/pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'auth/register',
    canActivate: [IsLoggedOutGuard],
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
