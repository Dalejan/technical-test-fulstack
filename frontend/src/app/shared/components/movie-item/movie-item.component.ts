import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-movie-item",
  templateUrl: "./movie-item.component.html",
  styleUrls: ["./movie-item.component.scss"]
})
export class MovieItemComponent implements OnInit {
  @Input("item") public item: any;
  constructor(private router: Router) {}

  ngOnInit() {}

  goToDetail() {
    this.router.navigateByUrl(`/home/detail/${this.item.id}`);
  }
}
