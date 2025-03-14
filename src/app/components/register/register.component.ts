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
  
  firstnameError: string = '';
  lastnameError: string = '';
  emailError: string = '';
  passwordError: string = '';

  isSubmitting: boolean = false;

  constructor(private authService: AuthService) {}

  // 🔹 Validación de email con regex
  isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // 🔹 Validación de nombres con mínimo 5 caracteres
  isValidName(name: string): boolean {
    return name.length >= 5;
  }

  register() {
    this.firstnameError = '';
    this.lastnameError = '';
    this.emailError = '';
    this.passwordError = '';

    // 🔹 Validar antes de enviar la solicitud al backend
    if (!this.isValidName(this.user.firstname)) {
      this.firstnameError = 'El nombre debe tener al menos 5 caracteres.';
    }
    if (!this.isValidName(this.user.lastname)) {
      this.lastnameError = 'El apellido debe tener al menos 5 caracteres.';
    }
    if (!this.isValidEmail(this.user.email)) {
      this.emailError = 'El correo electrónico no es válido.';
    }
    if (!this.isValidName(this.user.password)) {
      this.passwordError = 'La contraseña debe tener al menos 5 caracteres.';
    }

    // Si hay errores, no se envía el formulario
    if (this.firstnameError || this.lastnameError || this.emailError || this.passwordError) {
      return;
    }

    this.isSubmitting = true;
    
    this.authService.register(this.user).subscribe({
      next: response => {
        console.log('Registro exitoso:', response);
        this.isSubmitting = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting = false;
        console.error('Error en el registro:', error);
      }
    });
  }
}
