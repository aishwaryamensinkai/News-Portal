import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FeedbackService } from "../shared/feedback.service";
import { Feedback } from "../shared/feedback.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.css"],
})
export class FeedbackComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  usnRegex = /^01fe[0-9]{2}b[a-zA-Z]{2}[0-9]{3}$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(
    public feedbackService: FeedbackService,
    private router: Router
  ) {}

  ngOnInit() {}

  refreshFeedbackList() {
    this.feedbackService.getFeedbackProfile().subscribe((res) => {
      this.feedbackService.feedback = res as Feedback[];
    });
  }

  onSubmit(form: NgForm) {
    this.feedbackService.postFeedback(form.value).subscribe(
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
    this.feedbackService.selectedFeedback = {
      fullName: "",
      email: "",
      fb: "",
    };
    form.resetForm();
    this.serverErrorMessages = "";
  }
}
