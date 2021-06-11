import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
@Input() componentFromHome:any;
@Output() cancelRegister= new EventEmitter();
  
  model:any={}
  constructor() { } 

  ngOnInit(): void {
  }


  register(){
    console.log(this.componentFromHome)
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
