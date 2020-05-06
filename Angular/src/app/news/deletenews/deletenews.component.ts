import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { News } from "../../shared/news.model";
import { NewsService } from "../../shared/news.service";

declare var M: any;

@Component({
  selector: "app-deletenews",
  templateUrl: "./deletenews.component.html",
  styleUrls: ["./deletenews.component.css"],
})
export class DeletenewsComponent implements OnInit {
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

  onDelete(_id: string, form: NgForm) {
    if (confirm("Are you sure to delete this record ?") == true) {
      this.newsService.deleteNews(_id).subscribe((res) => {
        this.refreshBooksList();
        // this.resetForm(form);
        M.toast({ html: "Deleted successfully", classes: "rounded" });
      });
    }
  }

  Back() {
    this.router.navigate(["/function"]);
  }
}
