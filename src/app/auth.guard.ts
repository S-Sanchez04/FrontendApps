import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  if (!token) {
    alert('No tienes acceso. Inicia sesión.');
    router.navigate(['/login']);
    return false;
  }

  return true;
};
