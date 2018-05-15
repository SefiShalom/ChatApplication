import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  keyword: string;

  searchByfield: string = "Email ";

  constructor(private searchService: SearchService) {

  }

  ngOnInit() {

  }

  setSearchByField(fieldName: string){
    this.searchByfield = fieldName;
  }

  onKeyUp($event){
    this.searchService.searchFriends($event.target.value);
  }


}
