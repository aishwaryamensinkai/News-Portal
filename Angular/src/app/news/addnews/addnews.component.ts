import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { NewsService } from "../../shared/news.service";
import { News } from "../../shared/news.model";

declare var M: any;

@Component({
  selector: "app-addnews",
  templateUrl: "./addnews.component.html",
  styleUrls: ["./addnews.component.css"],
})
export class AddnewsComponent implements OnInit {
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
    this.newsService.postNews(form.value).subscribe(
      (res) => {
        this.showSucessMessage = true;
        setTimeout(() => (this.showSucessMessage = false), 10000);
        this.resetForm(form);
      },
      (err) => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join("<br/>");
        } else this.serverErrorMessages = "Something went wrong.";
      }
    );
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

  // onEdit(b) {}

  // onDelete(_id: string, form: NgForm) {
  //   if (confirm("Are you sure to delete this record ?") == true) {
  //     this.booksService.deleteBook(_id).subscribe((res) => {
  //       this.refreshBooksList();
  //       this.resetForm(form);
  //       M.toast({ html: "Deleted successfully", classes: "rounded" });
  //     });
  //   }
  // }
}
