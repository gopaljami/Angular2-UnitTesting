/*
  1. Use the smallest test type possible
  2. Test Public interface.Write readable tests.
  3. Don't mock unless there is a reason to( there is no reason if our dependencies are really quick and does not cause any side effects.
  4. Test all the time. Make tests fail and make sure when they fail they give us a good message
 */

import { inject, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserService } from '../app/user.service';
import { LoginService } from '../app/login.service';

describe('user service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService, UserService]
    });
  });

    it('should validate email address', inject([UserService], (service) => {
            service.email="test@test.com";
            expect(service.isValidEmail()).toBe(true);
            service.email="test.test.com";
            expect(service.isValidEmail()).toBe(false);
            service.email="abc";
            expect(service.isValidEmail()).toBe(false);
    }));

    it('should greet when login is wrong',inject([UserService],(service)=>{
          service.email="admin@test.com";
          service.password="test123";
          service.getGreeting().then((greeting)=>{
            expect(greeting).toEqual('Login failure!');
          });
    }));

    it('should greet when login is right',inject([UserService],(service)=>{
          service.email="admin@test.com";
          service.password="test@123";
          service.getGreeting().then((greeting)=>{
            expect(greeting).toEqual('Welcome');
          });
    }));
  });


/*If actual services takes more than a second and creates a lot of headache, let's go for MockLoginService */

  // class MockLoginService extends LoginService
  // {
  //     login(email:string, password:string){
  //         return Promise.resolve(true);
  //     }
  // }

  // describe('with mocked login service',()=>{

  //     beforeEach(()=>{
  //       TestBed.configureTestingModule({
  //         providers:[{provide:LoginService, useClass:MockLoginService},UserService]
  //       });
  //     });

  //      it('should greet', async(inject([UserService], (service) => {
  //           service.getGreeting().then((greeting) => {
  //             expect(greeting).toEqual('Welcome!');
  //           });
  //     })));

  // });
