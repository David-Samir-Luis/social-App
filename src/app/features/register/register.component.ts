import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  errorMessage: string = '';
  loading: boolean = false;
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    username: [''],
    email: ['', [Validators.required, Validators.email]],
    dateOfBirth: ['', Validators.required],
    gender: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    rePassword: ['', Validators.required]
  }, { validators: this.confirmPassword })


  submitForm(): void {

    if (this.registerForm.valid && !this.loading) {

      this.loading = true;
      this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            localStorage.setItem('socialToken', res.data.token)
            localStorage.setItem('socialUser', JSON.stringify(res.data.user))

            this.router.navigate(['/feed']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error.message;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      })
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  toggleShowPassword(pass: HTMLInputElement) {

    pass.type = pass.type === 'password' ? 'text' : 'password';
  }
  confirmPassword(g: AbstractControl) {
    const password = g.get('password')?.value;
    const rePassword = g.get('rePassword')?.value;
    if (password !== rePassword && rePassword !== '') {
      g.get('rePassword')?.setErrors({ mismatch: true })
      return { misMatch: true }
    }
    return null
  }
}
