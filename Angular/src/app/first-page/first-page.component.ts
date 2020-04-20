import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-first-page",
  templateUrl: "./first-page.component.html",
  styleUrls: ["./first-page.component.css"],
})
export class FirstPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  userpage() {
    this.router.navigate(["/login"]);
  }

  adminpage() {
    this.router.navigate(["/insidestudent"]);
  }
}
