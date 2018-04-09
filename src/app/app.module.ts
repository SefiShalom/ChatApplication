import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ChatService} from './services/chatservice.service'
import {LoginService} from './services/loginservice.service'
import { AppComponent } from './app.component';
import { ChatwindowComponent } from './components/chatwindow/chatwindow.component';
import { ChatslistComponent } from './components/chatslist/chatslist.component';
import { ChatlistitemComponent } from './components/chatlistitem/chatlistitem.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatwindowComponent,
    ChatslistComponent,
    ChatlistitemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ChatService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
