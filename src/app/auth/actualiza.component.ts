import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginUsuario } from "../models/login-usuario";
import { AlertService } from "../service/alert.service";
import { AuthService } from "../service/auth.service";
import { TokenService } from "../service/token.service";

@Component({
  selector: 'actualiza',
  templateUrl: 'actualiza.component.html'
})

export class ActualizaComponent implements OnInit {
  isLogged = false;
  isLoginFail = false;
  actualizaUsuario: LoginUsuario;
  usuario: string;
  newPassword: string;
  errMsj: string;

  constructor(
     private authService: AuthService,
     private tokenService: TokenService,
     private route: ActivatedRoute,
     private alertService: AlertService,
     private router: Router
  ) { }

  ngOnInit() {
    this.usuario = this.route.snapshot.paramMap.get('usuario') || '';    
  }

  actualizar(): void {
    this.actualizaUsuario = new LoginUsuario(this.usuario, this.newPassword);
    this.authService.actualiza(this.actualizaUsuario).subscribe(
        data => {            
            if (data !== null) {
                this.alertService.success('Exito!', 'La contraseña se ha actualizado correctamente.', () => {
                    this.isLogged = true;
                    this.tokenService.setToken(data.token);
                    this.tokenService.setUserName(data.nombreUsuario);                            
                    this.router.navigate(['/']);
                })
            }
        }, 
        err => {
            this.isLogged = false;
            this.errMsj = err.error.mensaje;        
            this.alertService.error("Error!", this.errMsj);
          }
    );
  }
}