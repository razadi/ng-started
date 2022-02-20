import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { PassportService } from '../services/passport/passport.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private passportService: PassportService
  ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.passportService.user$.getValue();
    
    if (user != null) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  
}
