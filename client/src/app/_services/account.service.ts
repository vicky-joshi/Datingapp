import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlSegment } from '@angular/router';
import { observable, Observable, ReplaySubject } from 'rxjs';
import{map} from 'rxjs/operators'
import { User } from '../_modules/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
 
  constructor(private http:HttpClient){}
  baseurl="https://localhost:44355/api";
  private CusrrentUserSource =new ReplaySubject<User>(1);
 currentUser$=this.CusrrentUserSource.asObservable();

  login(users:any)
  {
   return this.http.post<User>(this.baseurl+"/Accounts/Login",users).pipe
   (map((reponse:User)=>{
     const result=reponse;
      if(result)
      {
       localStorage.setItem('user',JSON.stringify(result));
this.CusrrentUserSource.next(result);
      }
   }))
  }

  setCurrentUser(user:User){
  this.CusrrentUserSource.next(user);
  }

  logout(){
  localStorage.removeItem('user')  
  this.CusrrentUserSource.next();
  }

  register(model:any){
    this.http.post<User>(this.baseurl+'accounts/Register',model).pipe(map((res:User)=>{
    const response=res;
    if(response)
    {
      localStorage.setItem('user',JSON.stringify(response))
      this.CusrrentUserSource.next(response);
    }
    }))
  }




}