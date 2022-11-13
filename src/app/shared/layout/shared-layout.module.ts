import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './navbar/navbar.component';
import { BaseLayout } from './base/base.layout';

@NgModule({
  declarations: [NavbarComponent, BaseLayout],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [BaseLayout],
})
export class SharedLayoutModule {}
