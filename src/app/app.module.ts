import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { Routing } from "./app-routing";
import { HomeComponent } from "./home/home.component";
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './auth/login.component';
import { AuthorizatedGuard } from './guards/authorized.guard';
import { RegistroComponent } from './auth/registro.component';
import { VigenciaComponent } from './vigencia/vigencia.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    VigenciaComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Routing,    
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [AuthorizatedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }