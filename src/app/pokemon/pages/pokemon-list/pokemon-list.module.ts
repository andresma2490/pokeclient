import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonListRoutingModule } from './pokemon-list-routing.module';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonComponentsModule } from '../../components/pokemon-components.module';


@NgModule({
  declarations: [
    PokemonListComponent
  ],
  imports: [
    CommonModule,
    PokemonListRoutingModule,
    PokemonComponentsModule
  ]
})
export class PokemonListModule { }
