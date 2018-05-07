import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {EventEmitter} from './services/EventEmitter'
import {LoginService} from './services/login.service'
import { AppComponent } from './app.component';
import { ChatwindowComponent } from './components/chatwindow/chatwindow.component';
import { ChatslistComponent } from './components/chatslist/chatslist.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterService } from './services/register.service';
import { ChatComponent } from './components/chat/chat.component';
import {ChatService} from './services/chat.service';
import {Routing} from './app.routing';
import { ChatlistItemComponent } from './components/chatlist-item/chatlist-item.component';
import {ChatlistItemService} from './services/chatlist-item.service';


@NgModule({
  declarations: [
    AppComponent,
    ChatwindowComponent,
    ChatslistComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent,
    ChatlistItemComponent,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing
  ],
  providers: [EventEmitter, LoginService, RegisterService, ChatService, ChatlistItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
