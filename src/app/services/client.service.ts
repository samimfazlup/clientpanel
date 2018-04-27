import { Client } from './../models/Client';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClientService {
  clientsRef = this.af.list("clients");
  clients: Observable<any[]>;
  clientRef: AngularFireObject<any>;
  client: Observable<any>;
  balance: Number;
  constructor(
    public af: AngularFireDatabase
  ) {
  this.clientsRef = af.list('clients');
  this.clients = this.clientsRef.snapshotChanges().map(changes=>{
    return changes.map(c=>({
        key:c.payload.key,...c.payload.val()
    }));
  })
  }
    getClients(){
      return this.clients;
    }
    newClient(client:Client){
      this.clientsRef.push(client)

    }
    getClient(id:string){
    this.clientRef = this.af.object('/clients/'+ id);
    this.client = this.clientRef.snapshotChanges();
    return this.client;
    }
    updateClient(id:string,client: Client){
      //console.log(client.balance);
      this.af.object('/clients/' + id).update({ 
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phone:client.phone,
        balance: (client.balance) ? client.balance: ""
      });
    }
    deleteClient(id: string){
      return this.clientRef.remove();
    }


  }