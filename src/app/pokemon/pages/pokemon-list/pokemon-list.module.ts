import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { PokemonListRoutingModule } from './pokemon-list-routing.module';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonComponentsModule } from '../../components/pokemon-components.module';

@NgModule({
  declarations: [PokemonListComponent],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    PokemonListRoutingModule,
    PokemonComponentsModule,
  ],
})
export class PokemonListModule {}
