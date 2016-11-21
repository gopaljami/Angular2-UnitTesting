/*
  1. Use the smallest test type possible
  2. Test Public interface.Write readable tests.
  3. Don't mock unless there is a reason to( there is no reason if our dependencies are really quick and does not cause any side effects.
  4. Test all the time. Make tests fail and make sure when they fail they give us a good message
 */

import {
  inject,
  async,
  fakeAsync,
  tick,
  ComponentFixture, 
  ComponentFixtureAutoDetect,
  TestBed
} from '@angular/core/testing'; //import the testing functions 'cause angular needs those to work properly 

import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { UserService } from '../app/user.service';
import { LoginService } from '../app/login.service';
import { loginComponent } from '../app/login.component';

class MockLoginService extends LoginService{
    login(email:string,password:string){
        return Promise.resolve(true);
    }
}

let comp:    loginComponent;
let fixture: ComponentFixture<loginComponent>;
let de:      DebugElement;
let el:      HTMLElement;

describe('login component',()=>{
    beforeEach(()=>{
      TestBed.configureTestingModule({
        declarations:[loginComponent],
        providers:[
          {provide:LoginService,useClass:MockLoginService},
          { provide: ComponentFixtureAutoDetect, useValue: true },
          UserService
          ]
      });   //Configure which component to test

        fixture = TestBed.createComponent(loginComponent);
        comp = fixture.componentInstance; // loginComponent test instance
        
        // query for the title <h1> by CSS element selector
            de = fixture.debugElement.query(By.css('h1'));
            el = de.nativeElement;
    });

    it('should display title', () => {
    //  fixture.detectChanges();
      expect(el.textContent).toContain(comp.greeting);
    });

    it('should change the title',()=>{
      comp.greeting='My Title';
      fixture.detectChanges();
      expect(el.textContent).toContain('My Title');
    });

    it('should accept email/password',async(()=>{
       fixture = TestBed.createComponent(loginComponent);
       fixture.detectChanges();
       var compiled = fixture.debugElement.nativeElement;
       compiled.querySelector('button').click();

          fixture.debugElement.componentInstance.pending.then(() => {
          fixture.detectChanges();
           expect(compiled.querySelector('h1').innerText).toBe('Welcome!');
         });
    }));

    /*to make tests run faster use fakeAsync( it wrap entire test and uses a zone to listen when setTimeOut,callbacks or promises registered and capture all those.
     So, instead of running asynchronously we use tick to simulate time moving forward and call those functions immediately)
    
    */ 
     it('should accept email/password (with fakeAsync)', fakeAsync(() => {
      var fixture = TestBed.createComponent(loginComponent);

      var compiled = fixture.debugElement.nativeElement;
      compiled.querySelector('button').click();

      tick();
      fixture.detectChanges();
      expect(compiled.querySelector('h1').innerText).toBe('Welcome!');
    }));  
    
});



