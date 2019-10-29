import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MovieListComponent } from "./components/movie-list/movie-list.component";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: MovieListComponent
  }
];

@NgModule({
  declarations: [MovieListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    InfiniteScrollModule,
    FormsModule
  ]
})
export class MovieListModule {}
