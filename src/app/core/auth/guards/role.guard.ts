import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../_services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/sign-in']);
      return false;
    }

    const roles = next.data['roles'] as [];
    console.log(roles);
    for (let role of roles) {
      if (this.authService.hasRole(role)) {
        return true;
      }
    }
    Swal.fire('Access denied', `Hello ${this.authService.user.username}, You do not have access to this resource!`, 'warning');
    this.router.navigate(['/home']);
    return false;
  }
}
