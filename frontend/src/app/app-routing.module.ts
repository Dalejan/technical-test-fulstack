/**
 * AppRouting.module
 * Archivo encargado de manejar las rutas 'padres' de los módulos para hacer lazyloading
 */
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CallbackComponent } from "./callback.component";

const routes: Routes = [
  {
    path: "home",
    loadChildren: "./modules/layout/layout.module#LayoutModule"
  },
  {
    path: "error",
    loadChildren: "./modules/error-pages/error-pages.module#ErrorPagesModule"
  },
  { path: "callback", component: CallbackComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "**",
    redirectTo: "/error/404"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
