import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  
  const requiredRole = route.data['role'];
  const currentUser = authService.getCurrentUser(); 
  if (requiredRole && currentUser.role !== requiredRole) {
    return false;
  }

  return true; 
};