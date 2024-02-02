import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthServiceService);
  const router = inject(Router);

  return authService.user.pipe(take(1),map((user)=>{
    if(user){
      return
    }
    return router.createUrlTree(['']);
  }))
  
};
