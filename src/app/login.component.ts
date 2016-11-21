import {Component} from '@angular/core';
import {UserService} from './user.service';

@Component({
    selector: 'router-outlet',
    templateUrl:'login.component.html',
    styleUrls: [
    './app.style.css'
    ]
  
})

export class loginComponent{
   greeting:string='Please login';
   pending: Promise<void>;

   constructor(public user: UserService) {
  }

   submit(email:string,password:string){
       this.user.email=email;
       this.user.password=password;
       this.greeting="Processing...";
       this.pending=this.user.getGreeting().then((greeting)=>{
           this.greeting=greeting;
       });
   }
}