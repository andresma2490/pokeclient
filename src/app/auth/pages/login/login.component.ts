import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    nickname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  error: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { nickname, password } = this.loginForm.getRawValue();
    this.authService.login(nickname!, password!).subscribe({
      error: (res) => (this.error = res.error.message),
    });
  }
}
