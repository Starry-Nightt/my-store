import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
  imports: [CommonModule, SharedModule, AuthRoutingModule],
  declarations: [AuthComponent, LoginFormComponent],
})
export class AuthModule {}
