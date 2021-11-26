import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'  
})
export class RegistroComponent implements OnInit {

  nuevoUsuario: NuevoUsuario;
  nombre: string;  
  email: string;
  password: string;
  errMsj: string;
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.email, this.password);
    this.authService.registro(this.nuevoUsuario).subscribe(
      data => {
        if (data !== null) {
          this.alertService.success("Cuenta creada", "Registro exitoso...")
          this.router.navigate(['/login']);
        }
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.alertService.error("Error", "No fue posible realizar el registro");        
      }
    );
  }

}
