import { Component, OnInit } from '@angular/core';
import {RequestsService} from '../../services/requests.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Request} from '../../interfaces/request';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requestsList: Request[];
  // user: User;

  constructor(private requestsService: RequestsService) {
    this.requestsList = [];
  }

  ngOnInit() {
    this.requestsService.newRequestSource.subscribe(request => {
      if(request){
        this.requestsList.push(request);
        console.log(this.requestsList);
      }
    });
  }

}
