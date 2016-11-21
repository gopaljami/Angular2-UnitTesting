import {Injectable} from '@angular/core';

@Injectable()
export class LoginService{

    login(email:string,password:string){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                    if(email==='admin@test.com' && password==='test@123'){
                        resolve(true);
                    }else{
                        resolve(false);
                    }
            },1000);
        });
    }
    
}

