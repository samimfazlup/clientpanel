import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  constructor(
    private authService:AuthService,
    private router:Router,
    private _flashMessagesSevice:FlashMessagesService
  ) { }

  ngOnInit() {
  }
  onSubmit(){
    this.authService.login(this.email, this.password)
      .then(res=>{
        this._flashMessagesSevice.show("You are logged in",{cssClass: "alert-success", timeout: 400});
        this.router.navigate(['/']);
      })
      .catch(err=>{
        this._flashMessagesSevice.show(err.message, {cssClass:'alert-danger', timeout: 4000});
        this.router.navigate(['/login']);
      })
  }

}
