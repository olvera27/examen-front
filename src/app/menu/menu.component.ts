import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',    
  })
  export class MenuComponent implements OnInit {

    constructor(
        private tokenService: TokenService,
        private router: Router
      ) { }

    ngOnInit() {}

    public logout(): void {
        this.tokenService.logOut();
        this.router.navigate(['/login']);
      }

  }