import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service';
import {SearchResult} from '../../interfaces/searchresult';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerm: {};
  resultsList: SearchResult[];
  isReady: boolean;
  loadingList: boolean;

  constructor(private searchService: SearchService) {
    this.searchTerm = {keywords: ""};
    this.resultsList = [];
    this.loadingList = false;
  }

  ngOnInit() {

    this.searchService.isReady.subscribe(ready => {
      if(ready){
        this.searchService.resultsList.subscribe(list => {
          if(list){
            this.resultsList = list;
            this.loadingList = false;
          }else{
            this.resultsList = [];
            this.loadingList = false;
          }
        });
        this.isReady = true;
      }
    });
  }

  onSearchButtonClick(){
    this.resultsList = [];
    this.loadingList = true;
    this.searchService.searchFriends(this.searchTerm);
  }

  onAddButtonClick(subject_id: string){
    this.searchService.addFriend(subject_id);
  }


}
