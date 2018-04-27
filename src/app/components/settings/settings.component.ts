import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from './../../services/settings.service';
import { Settings } from './../../models/Settings';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings:Settings;

  constructor(
    private settingsService:SettingsService,
    private _flashMessagesService:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
    console.log(this.settings);
  }
  onSubmit(){
    this.settingsService.changeSettings(this.settings);
    this._flashMessagesService.show('settings saved', {cssClass:'alert-success', timeout: 4000});
    this.router.navigate(['/settings']);
  }


}
