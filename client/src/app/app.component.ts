import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_modules/User';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'client';
users:any;
  constructor(private http:HttpClient,private acccountservice:AccountService){}
  
  ngOnInit() {
   this.GetUsers();
   this.setCurrentUset();
  }

GetUsers(){
  this.http.get("https://localhost:44355/api/Users").subscribe(res=>{
this.users=res
  },error=>{console.log(error)},
  )
}
 
setCurrentUset(){
  const u=localStorage.getItem('user')!
  const psuser:User=JSON.parse(u);
  this.acccountservice.setCurrentUser(psuser);
}


}
