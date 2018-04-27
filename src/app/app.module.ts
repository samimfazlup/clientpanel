import { SettingsService } from './services/settings.service';
import { AuthGuard } from './guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth} from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ClientService } from './services/client.service';
import { AuthService } from './services/auth.service';


const appRoutes:Routes = [
  {path:'',component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'register',component: RegisterComponent},
  {path: 'login',component: LoginComponent},
  {path: 'add-client',component: AddClientComponent, canActivate:[AuthGuard]},
  {path: 'client/:id',component: ClientDetailsComponent, canActivate:[AuthGuard]},
  {path:'edit-client/:id', component:EditClientComponent, canActivate:[AuthGuard]},
  {path:'register', component:RegisterComponent},
  {path:'settings', component:SettingsComponent, canActivate:[AuthGuard]},
  {path:'**', component:PageNotFoundComponent}
];
export const firebaseConfig = {
  apiKey: "AIzaSyCjOyhglnajE1hw8O6dy_vecU8odLNETDc",
  authDomain: "clientpanel-f1fb1.firebaseapp.com",
  databaseURL: "https://clientpanel-f1fb1.firebaseio.com",
  projectId: "clientpanel-f1fb1",
  storageBucket: "clientpanel-f1fb1.appspot.com",
  messagingSenderId: "105020403008"
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ClientsComponent,
    AddClientComponent,
    EditClientComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    SidebarComponent,
    ClientDetailsComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    FlashMessagesModule.forRoot()
  ],
  providers: [
    ClientService,
    SettingsService,
    AngularFireDatabase,
    AngularFireAuth,
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
