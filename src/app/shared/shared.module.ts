import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import COMPONENTS from './components';
import { DIRECTIVES } from './directives';
import { LayoutsModule } from '@layouts/layouts.module';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  declarations: [...COMPONENTS, ...DIRECTIVES],
  exports: [CommonModule, MaterialModule, ReactiveFormsModule, ...COMPONENTS],
})
export class SharedModule {}
