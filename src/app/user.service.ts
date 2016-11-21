import {Injectable} from '@angular/core';
import {LoginService} from './login.service';

@Injectable()
export class UserService {
   email: string = 'test@test.com';
   password: string='test123';

  constructor(private _loginService: LoginService) {
  } 

  isValidEmail(){
     let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.email);
  }

  getGreeting() {
    return this._loginService.login(this.email,this.password).then((success) => {
      return success ? 'Welcome!': 'Login failure!';
    });
   
  }
 
}