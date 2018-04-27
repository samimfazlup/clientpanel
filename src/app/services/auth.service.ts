import { Observable } from 'rxjs/Observable';
import { AngularFireAuth, AUTH_PROVIDERS } from 'angularfire2/auth';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService{
  constructor(private afAuth:AngularFireAuth){ 
  }
  login(email:string, password:string){
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData=>{
          resolve(userData)
        })
        .catch(err=>{
          reject(err);
        })
    })
  }
  getAuth(){
    return this.afAuth.authState.map(auth=> auth)
  }
  logOut(){
    return this.afAuth.auth.signOut()
   
  }
  register(email:string, password:string){
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData =>{
          resolve(userData)
        })
        .catch(err=>{
          reject(err)
        });
    });

  }
}