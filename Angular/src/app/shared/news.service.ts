import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { News } from "./news.model";

@Injectable({
  providedIn: "root",
})
export class NewsService {
  news: News[];
  selectedNews: News = {
    location: "",
    nid: "",
    headline: "",
    des: "",
    pincode: "",
    category:"",
  };

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: "True" }) };

  constructor(private http: HttpClient) {}

  //HttpMethods
  readonly baseURL = "http://localhost:3000/api/deleteNews";

  postNews(news: News) {
    return this.http.post(
      environment.apiBaseUrl + "/bregister",
      news,
      this.noAuthHeader
    );
  }

  getNewsProfile() {
    return this.http.get(environment.apiBaseUrl + "/newsProfile");
  }

  // updatebooks(b: Books) {
  //   return this.http.put(this.baseURL, `/${b._id}`);
  // }

  deleteNews(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
