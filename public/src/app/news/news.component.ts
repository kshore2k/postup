import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  articles: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.runJquery();
    this.getNewsFromService(this._httpService.getTechCrunch());
  }

  getNewsFromService(api){
    let observable = api;
    observable.subscribe(data => {
      console.log("Fetching News", data);
      this.articles = data['articles'];
    })
  }

  runJquery(){
    $(document).ready(function(){

      // Scroll Top Animation
      $('#page_top').children().click(function(){
          $('html, body').animate({scrollTop: $('html').offset().top}, 500)
      });
  
      // Social Link Hover Effects
      var imageSrc;
      $('.social_icon').hover(
          function(){
              imageSrc = $(this).attr('src');
              $(this).attr('src', $(this).attr('hover'))
          },
          function(){
              $(this).attr('src', imageSrc)
          }
      );
      
      // Set TechCrunch as Initial Active Link
      $('#initial_link').addClass('active');

      // Set Active Link Class on Click
      $('#news_subheader').children().click(function(){
        $('.active').removeClass('active');
        $(this).addClass('active');
      });

    })
  }

}
