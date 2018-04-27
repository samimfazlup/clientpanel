import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser:string;
  showRegister:boolean;
  constructor(
    private authService:AuthService,
    private router:Router,
    private _flashMessageService:FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth =>{
      if(auth){
        //console.log(typeof(auth));
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }else{
        this.isLoggedIn = false;
      }
      this.showRegister = this.settingsService.getSettings().allowRegistration;
    });
  }
  onLogOutClick(){
    this.authService.logOut();
      this._flashMessageService.show('You are logged out',{cssClass:'alert-success', timeout: 4000});
      this.router.navigate(['/login']);  
  }

}
