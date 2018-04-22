import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {ChatComponent} from './components/chat/chat.component';

const appRoutes:Routes = [{
  path: '',
  component: LoginComponent
},{
  path: 'chat',
  component: ChatComponent
},{
  path:'login/register',
  component: RegisterComponent
}]

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
