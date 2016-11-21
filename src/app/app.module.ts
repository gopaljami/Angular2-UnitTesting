import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {AppComponent} from './app.component';
import{UserService} from  './user.service';
import {LoginService} from './login.service';
import { loginComponent }  from './login.component';


@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [AppComponent,loginComponent],  
    providers:[UserService,LoginService],
    bootstrap:[AppComponent]
})

export class AppModule {
    
}
