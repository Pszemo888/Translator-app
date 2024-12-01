import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Sprawdź, czy użytkownik jest zalogowany
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Opcjonalne sprawdzanie roli (jeśli trasa wymaga określonej roli)
  const requiredRole = route.data['role'];
  const currentUser = authService.getCurrentUser(); // Metoda zwracająca dane użytkownika
  if (requiredRole && currentUser.role !== requiredRole) {
    router.navigate(['/unauthorized']); // Opcjonalna strona "Brak dostępu"
    return false;
  }

  return true; // Dostęp przyznany
};