import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JsonPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  protectedData: any;

  constructor(private authService: AuthService) {}

  getData() {
    console.log('Haciendo petición al backend...');
    this.authService.getProtectedData().subscribe({
      next: (data) => {
        this.protectedData = data;
        console.log('Datos protegidos:', data);
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
      }
    });
  }
}
