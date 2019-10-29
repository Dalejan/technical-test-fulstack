/**
 * layout.component
 * Componente encargado de 'pintar' el cuerpo de la app una vez se autentique el usuario
 */
import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
  // variable para abrir o cerrar el menú
  public blMenu = false;
  // rutas del menu
  public menu = [
    {
      url: "list",
      label: "Películas"
    },
    {
      url: "series",
      label: "Series"
    },
    {
      url: "shows",
      label: "Shows"
    },
    {
      url: "casts",
      label: "Casts"
    }
  ];

  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  public onLogin() {
    console.log("should login");
    this.authService.login(this.router.url);
  }

  public onLogout() {
    console.log("should logout");
    this.authService.logout();
  }

  public onToggleMenu() {
    this.blMenu = !this.blMenu;
  }
}
