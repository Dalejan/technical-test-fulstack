import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Error404Component } from "./components/error404/error404.component";
import { Error401Component } from "./components/error401/error401.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "404", component: Error404Component },
  { path: "401", component: Error401Component }
];

@NgModule({
  declarations: [Error404Component, Error401Component],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ErrorPagesModule {}
