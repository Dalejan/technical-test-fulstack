import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MovieDetailComponent } from "./components/movie-detail/movie-detail.component";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { CommentsListComponent } from "./components/comments-list/comments-list.component";
import { FormsModule } from "@angular/forms";
import { RatingModule } from "ngx-rating";

const routes: Routes = [
  {
    path: ":id",
    component: MovieDetailComponent
  }
];

@NgModule({
  declarations: [MovieDetailComponent, CommentsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    RatingModule
  ]
})
export class MovieDetailModule {}
