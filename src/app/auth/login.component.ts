import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginUsuario } from "../models/login-usuario";
import { AlertService } from "../service/alert.service";
import { AuthService } from "../service/auth.service";
import { TokenService } from "../service/token.service";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  usuario: string;
  password: string;
  roles: string[] = [];
  errMsj: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;     
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.usuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);        
        this.roles = data.authorities;
        this.router.navigate(['/']);
      },
      err => {
        this.isLogged = false;
        this.errMsj = err.error.mensaje;        
        if (err.error.codigo == -1) {          
          this.alertService.warning("Advertencia!", this.errMsj, () => {            
            this.router.navigate(['/actualiza', this.usuario]);
          });
        } else {
          this.alertService.error("Error!", this.errMsj);
        }         
      }
    );
  }
}