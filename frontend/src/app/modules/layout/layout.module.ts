import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./components/layout/layout.component";
import { AuthService } from "src/app/services/auth/auth.service";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "list", pathMatch: "full" },
      {
        path: "list",
        loadChildren: "../movie-list/movie-list.module#MovieListModule"
      },
      {
        path: "detail",
        loadChildren: "../movie-detail/movie-detail.module#MovieDetailModule"
      }
    ]
  }
];

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [AuthService]
})
export class LayoutModule {}
