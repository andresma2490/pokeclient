import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/auth/services/auth.service';
import { passwordsMustBeEquals } from '@app/auth/validators/password.validators';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    nickname: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    passwordForm: new FormGroup(
      {
        password: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [passwordsMustBeEquals],
      }
    ),
  });

  get passwordForm() {
    return this.registerForm.get('passwordForm');
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const nickname = this.registerForm.get('nickname')!.value;
    const password = this.passwordForm!.get('password')!.value;

    this.authService
      .register({
        nickname,
        password,
      })
      .pipe(switchMap(() => this.authService.login(nickname, password)))
      .subscribe();
  }
}
