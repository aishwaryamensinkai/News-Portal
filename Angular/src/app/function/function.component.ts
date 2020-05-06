import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../shared/user.service";

@Component({
  selector: "app-function",
  templateUrl: "./function.component.html",
  styleUrls: ["./function.component.css"],
})
export class FunctionComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  profile() {
    this.router.navigate(["/userprofile"]);
  }
  addbooks() {
    this.router.navigate(["/news"]);
  }
  deletebook() {
    this.router.navigate(["/deletenews"]);
  }
  viewfeedback() {
    this.router.navigate(["/viewfeedback"]);
  }
  viewnews() {
    this.router.navigate(["/viewnews"]);
  }
  updatenews(){
    this.router.navigate(["/updatenews"]);
  }
  logout() {
    this.userService.deleteToken();
    this.router.navigate(["/login"]);
  }
}
