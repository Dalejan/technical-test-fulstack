import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth/auth.service";

@Component({
  selector: "app-callback",
  template: `
    <p>
      Loading...
    </p>
  `,
  styles: []
})
export class CallbackComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.handleAuthCallback();
  }
}
