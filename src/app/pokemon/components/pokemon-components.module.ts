import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';

@NgModule({
  declarations: [PokemonCardComponent],
  imports: [CommonModule, RouterModule],
  exports: [PokemonCardComponent],
})
export class PokemonComponentsModule {}
