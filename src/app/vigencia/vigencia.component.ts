import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { AlertService } from '../service/alert.service';
import { TokenService } from '../service/token.service';
import { VigenciaService } from '../service/vigencia.service';

@Component({
    selector: 'app-vigencia',
    templateUrl: './vigencia.component.html',    
  })
  export class VigenciaComponent implements OnInit {

    usuario: Usuario;
    user: string;
    vigenciaNueva:Date;

    constructor(
        private vigenciaService: VigenciaService, 
        private tokenService: TokenService, 
        private alertService: AlertService,
        private router: Router) { }

    ngOnInit() {
        this.user = JSON.stringify(this.tokenService.getUserName());        
        this.vigenciaService.consulta(this.user.replace(/['"]+/, '').replace(/['"]+/, '')).subscribe((data: Usuario) => {            
            this.usuario = data;            
        });
    }

    actualizaVigencia() {        
        this.usuario.fechaVigencia = this.vigenciaNueva;
        this.vigenciaService.updateVigencia(this.usuario).subscribe((data:any)=>{
            this.alertService.success('Exito!', data.mensaje);
            this.router.navigate(['/home']);
        });
    }

  }