import { Component, OnInit } from "@angular/core";
import { Feedback } from "../shared/feedback.model";
import { FeedbackService } from "../shared/feedback.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-viewfeedback",
  templateUrl: "./viewfeedback.component.html",
  styleUrls: ["./viewfeedback.component.css"],
})
export class ViewfeedbackComponent implements OnInit {
  constructor(
    public feedbackService: FeedbackService,
    private router: Router
  ) {}

  ngOnInit() {
    this.refreshFeedbackList();
  }

  refreshFeedbackList() {
    this.feedbackService.getFeedbackProfile().subscribe((res) => {
      this.feedbackService.feedback = res as Feedback[];
    });
  }

  Back() {
    this.router.navigate(["./function"]);
  }
}
