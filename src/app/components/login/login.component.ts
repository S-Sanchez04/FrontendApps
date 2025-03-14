import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessages = { email: '', password: '', general: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.errorMessages = { email: '', password: '', general: '' };

    if (!this.credentials.email) {
      this.errorMessages.email = 'El correo electrónico es obligatorio.';
    }
    if (!this.credentials.password) {
      this.errorMessages.password = 'La contraseña es obligatoria.';
    }
    if (this.errorMessages.email || this.errorMessages.password) {
      return;
    }

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.authService.handleLoginSuccess(response.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        if (error.status === 403) {
          this.errorMessages.general = 'Usuario o contraseña incorrectos.';
        } else {
          this.errorMessages.general = 'Error en el servidor. Intente nuevamente.';
        }
      }
    });
  }
}
