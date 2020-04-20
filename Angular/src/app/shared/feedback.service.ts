import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { Feedback } from "./feedback.model";

@Injectable({
  providedIn: "root",
})
export class FeedbackService {
  feedback: Feedback[];
  selectedFeedback: Feedback = {
    fullName: "",
    email: "",
    fb:"",
  };

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: "True" }) };

  constructor(private http: HttpClient) {}

  //HttpMethods

  postFeedback(feedback: Feedback) {
    return this.http.post(
      environment.apiBaseUrl + "/fregister",
      feedback,
      this.noAuthHeader
    );
  }

  getFeedbackProfile() {
    return this.http.get(environment.apiBaseUrl + "/feedbackProfile");
  }
}