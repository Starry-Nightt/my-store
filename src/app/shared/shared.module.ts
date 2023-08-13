import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import COMPONENTS from './components';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  declarations: [...COMPONENTS],
  exports: [CommonModule, MaterialModule, ReactiveFormsModule, ...COMPONENTS],
})
export class SharedModule {}
