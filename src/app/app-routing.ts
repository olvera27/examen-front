import { RouterModule, Routes } from '@angular/router';
import { ActualizaComponent } from './auth/actualiza.component';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { AuthorizatedGuard } from './guards/authorized.guard';
import {HomeComponent} from "./home/home.component";
import { VigenciaComponent } from './vigencia/vigencia.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'actualiza/:usuario', component: ActualizaComponent },
  { path: 'home', component: HomeComponent, canActivate: [ AuthorizatedGuard ] },
  { path: 'vigencia', component: VigenciaComponent, canActivate: [ AuthorizatedGuard ] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home'}
];

export const Routing = RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' });