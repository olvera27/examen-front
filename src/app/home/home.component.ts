import {Component, OnInit} from "@angular/core";
import { TokenService } from "../service/token.service";

@Component({
  selector: 'home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  
  user: string;

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.user = JSON.stringify(this.tokenService.getUserName());
  }



}