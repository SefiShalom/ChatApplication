import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  keyword: string;

  searchByfield: string = "Email ";

  constructor() { }

  ngOnInit() {

  }

  setSearchByField(fieldName: string){
    this.searchByfield = fieldName;
  }


}
