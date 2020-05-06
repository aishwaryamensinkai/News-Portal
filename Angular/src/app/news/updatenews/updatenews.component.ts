import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { NewsService } from "../../shared/news.service";
import { News } from "../../shared/news.model";

declare var M: any;

@Component({
  selector: "app-updatenews",
  templateUrl: "./updatenews.component.html",
  styleUrls: ["./updatenews.component.css"],
})
export class UpdatenewsComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(public newsService: NewsService, private router: Router) {}
  ngOnInit() {
    this.refreshBooksList();
  }

  refreshBooksList() {
    this.newsService.getNewsProfile().subscribe((res) => {
      this.newsService.news = res as News[];
    });
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.newsService.postNews(form.value).subscribe(
        (res) => {
          this.showSucessMessage = true;
          setTimeout(() => (this.showSucessMessage = false), 10000);
          this.resetForm(form);
          this.refreshBooksList();
        },
        (err) => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join("<br/>");
          } else this.serverErrorMessages = "Something went wrong.";
        }
      );
    } else {
      this.newsService.updateNews(form.value).subscribe(
        (res) => {
          this.showSucessMessage = true;
          setTimeout(() => (this.showSucessMessage = false), 10000);
          this.resetForm(form);
          this.refreshBooksList();
        },
        (err) => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join("<br/>");
          } else this.serverErrorMessages = "Something went wrong.";
        }
      );
    }
  }

  onEdit(b: News) {
    this.newsService.selectedNews = b;
  }

  resetForm(form: NgForm) {
    this.newsService.selectedNews = {
      _id: "",
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
