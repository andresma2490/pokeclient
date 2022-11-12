import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { BaseLayout } from './base/base.layout';



@NgModule({
  declarations: [
    NavbarComponent,
    BaseLayout
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BaseLayout
  ]
})
export class SharedLayoutModule { }
