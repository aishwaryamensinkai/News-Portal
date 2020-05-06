import { Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { AuthGuard } from "./auth/auth.guard";
import { FirstPageComponent } from "./first-page/first-page.component";
import { FunctionComponent } from "./function/function.component";
import { FeedbackComponent } from "./feedback/feedback.component";
import { ViewfeedbackComponent } from "./viewfeedback/viewfeedback.component";
import { NewsComponent } from "./news/news.component";
import { DeletenewsComponent } from "./news/deletenews/deletenews.component";
import { AddnewsComponent } from "./news/addnews/addnews.component";
import { ViewnewsComponent } from "./viewnews/viewnews.component";
import { NewsviewComponent } from "./newsview/newsview.component";
import { UpdatenewsComponent } from "./news/updatenews/updatenews.component";
export const appRoutes: Routes = [
  {
    path: "signup",
    component: UserComponent,
    children: [{ path: "", component: SignUpComponent }],
  },
  {
    path: "login",
    component: UserComponent,
    children: [{ path: "", component: SignInComponent }],
  },
  {
    path: "userprofile",
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "firstpage",
    component: FirstPageComponent,
  },
  {
    path: "function",
    component: FunctionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "viewnews",
    component: ViewnewsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "viewnewsinnews",
    component: NewsviewComponent,
  },
  {
    path: "deletenews",
    component: NewsComponent,
    children: [{ path: "", component: DeletenewsComponent }],
    canActivate: [AuthGuard],
  },
  {
    path: "news",
    component: NewsComponent,
    children: [{ path: "", component: AddnewsComponent }],
    canActivate: [AuthGuard],
  },
  {
    path: "updatenews",
    component: NewsComponent,
    children: [{ path: "", component: UpdatenewsComponent }],
    canActivate: [AuthGuard],
  },
  {
    path: "feedback",
    component: FeedbackComponent,
  },
  {
    path: "viewfeedback",
    component: ViewfeedbackComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "",
    redirectTo: "/firstpage",
    pathMatch: "full",
  },
];
