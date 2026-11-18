
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  // Confirm Password Validation
  passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  // Register Form
  registerForm = new FormGroup({

    fullName: new FormControl('', [
      Validators.required
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[6-9]\d{9}$/)
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    ]),

    confirmPassword: new FormControl('', [
      Validators.required
    ])

  }, {
    validators: this.passwordMatchValidator
  });

  // Form Controls Access
  get f() {
    return this.registerForm.controls;
  }

  // Submit Function
  onSubmit() {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    console.log('Registration Successful');
    console.log(this.registerForm.value);

  }

}
