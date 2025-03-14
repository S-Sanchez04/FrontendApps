import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };
  
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;

  constructor(private authService: AuthService) {}

  register() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;
    
    this.authService.register(this.user).subscribe({
      next: response => {
        console.log('Registro exitoso:', response);
        this.successMessage = '¡Registro exitoso! Redirigiendo...';
        this.authService.handleLoginSuccess(response.token);
        this.isSubmitting = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting = false;
        if (error.status === 409) {
          this.errorMessage = 'Este email ya está registrado. Por favor, usa otro.';
        } else if (error.status === 400) {
          this.errorMessage = 'Datos de registro inválidos. Por favor verifica la información.';
        } else if (error.status === 403) {
          this.errorMessage = 'No tienes permiso para registrarte. Contacta al administrador.';
        } else {
          this.errorMessage = 'Error en el registro. Por favor, inténtalo más tarde.';
        }
        console.error('Error en el registro:', error);
      }
    });
  }
}