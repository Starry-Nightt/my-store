import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginData } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  form = this.fb.group({
    username: ['kminchelle', [Validators.required]],
    password: ['0lelplR', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  onLogin() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const loginDetail: LoginData = {
      username: this.form.get('username').value,
      password: this.form.get('password').value,
    };
    this.authService.login(loginDetail).subscribe(() => {
      this.router.navigate(['/product']);
    });
  }
}
