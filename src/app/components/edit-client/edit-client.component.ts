import { SettingsService } from './../../services/settings.service';
import { Client } from './../../models/Client';
import { ClientService } from '../../services/client.service'; 
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id:string;
  updatedBalance:number;
  client:Client = {
    firstName:'',
    lastName: '',
    email:'',
    phone:'',
    balance:0
  }
  disableBalanceOnEdit:boolean = true;
  constructor(
    public clientService:ClientService,
    public router:Router,
    public route:ActivatedRoute,
    public flashMessagesService:FlashMessagesService,
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    //Getting disableBalanceOnEdit from  settings service
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
    //Get client
    this.clientService.getClient(this.id).subscribe(client=>{
      this.client = {key:client.key,...client.payload.val()};
      //balance undefined = setting new balance to existing balance
      this.updatedBalance = this.client.balance;
    })
  }
  onSubmit({value, valid}:{value: Client, valid: boolean}){
    if(!valid){
      this.flashMessagesService.show('Please fill in all fields', {cssClass:'alert-danger', timeout: 4000});
      this.router.navigate(['edit-client/'+ this.id]);
    }else{
      if(!value.balance){
        value.balance = this.updatedBalance;
      }
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show('New Client added',{cssClass:"alert-sucess", timeout: 4000});
      this.router.navigate(['/']);
    }

  }

}
