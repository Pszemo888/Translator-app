import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../../validators/custom-validator';
@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule], 
})
export class RegisterComponent {
  form: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        CustomValidators.passwordLength(8, 20)
      ]],
    });
  }
  register() {
    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe({
        next: (response) => {
          this.successMessage = 'Registration successful!';
          this.errorMessage = '';
          console.log('Response from server:', response);
          console.log('Send data:', this.form.value);
          
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
         this.errorMessage = 'Registration failed. Please try again.';
         this.successMessage = '';
          console.error('Error:', err);
        },
      });
    }
  }
} 