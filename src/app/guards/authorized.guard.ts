import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable()
export class AuthorizatedGuard implements CanActivate {

  constructor(private router: Router, private tokenService: TokenService) { }

  canActivate() {
    console.log(this.tokenService.isAuthenticated());
    if (this.tokenService.isAuthenticated()) {      
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }
}