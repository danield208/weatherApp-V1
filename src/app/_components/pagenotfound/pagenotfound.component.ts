import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-pagenotfound",
  template: `
    <h1>Page not found!</h1>
    <button routerLink="/start" mat-raised-button color="primary">
      Return
    </button>
  `,
  styleUrls: ["./pagenotfound.component.scss"],
})
export class PagenotfoundComponent {
  constructor(public router: Router) {}
}
