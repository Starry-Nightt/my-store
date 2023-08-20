import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '@shared/shared.module';

const Layouts = [HeaderComponent, MainLayoutComponent, FooterComponent];

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [...Layouts],
  exports: [...Layouts],
})
export class LayoutsModule {}
