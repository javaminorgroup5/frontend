import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("userId") && sessionStorage.getItem("userId") != ''){
      this.router.navigate(['me']);
    } else {
      this.router.navigate(['login']);
    }
  }

}
