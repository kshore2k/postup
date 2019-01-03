import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  articles: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getNewsFromService();
  }

  getNewsFromService(){
    let observable = this._httpService.getNews();
    observable.subscribe(data => {
      console.log("Fetching News", data);
      this.articles = data['articles'];
    })
  }
}
