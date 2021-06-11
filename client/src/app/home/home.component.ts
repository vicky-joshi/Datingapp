import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
register:boolean;
user:any;
  constructor(private http:HttpClient) { }
baseurl="https://localhost:44355/api/Users/GetUsers"
  ngOnInit(): void {
    this.GetRegisterUser();
  }

  RegisterToggle(){
    this.register=true;
  }

  GetRegisterUser(){
    debugger;
this.http.get(this.baseurl).subscribe(res=>{
  this.user=res
  console.log(this.user);
},error=>{
    console.log(error)
})
  }

CancelRegisterMode(event:boolean){
this.register=event;
}

}
