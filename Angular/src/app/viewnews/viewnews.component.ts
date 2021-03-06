import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { News } from "../shared/news.model";
import { NewsService } from "../shared/news.service";

declare var M: any;

@Component({
  selector: "app-viewnews",
  templateUrl: "./viewnews.component.html",
  styleUrls: ["./viewnews.component.css"],
})
export class ViewnewsComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(public newsService: NewsService, private router: Router) {}

  // ngOnInit(){

  // }
  ngOnInit() {
    this.refreshBooksList();
  }

  refreshBooksList() {
    this.newsService.getNewsProfile().subscribe((res) => {
      this.newsService.news = res as News[];
    });
  }
  resetForm(form: NgForm) {
    this.newsService.selectedNews = {
      _id:"",
      location: "",
      nid: "",
      headline: "",
      des: "",
      pincode: "",
      category: null,
    };
    form.resetForm();
    this.serverErrorMessages = "";
  }

  Back() {
    this.router.navigate(["/function"]);
  }
}
