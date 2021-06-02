import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { User } from '../_modules/User';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  model:any={};
  constructor(public accountservice:AccountService) { 
  }

  ngOnInit(): void {
  }

  login(){
    debugger;
    this.accountservice.login(this.model).subscribe(res=>{
      console.log(res)
          },error=>{console.log})
        }

  logout(){
    this.accountservice.logout();
  }

}
