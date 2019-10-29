import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { environment } from "src/environments/environment";

// ngrx
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule } from "@ngrx/store";
import { appReducers } from "./app.reducers";
import { EffectsModule } from "@ngrx/effects";
import { effects } from "./ngrx/effects";

import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "./guards/auth-guard.service";
import { CallbackComponent } from "./callback.component";

@NgModule({
  declarations: [AppComponent, CallbackComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Guarda los últimos 25 estados
      logOnly: environment.production // production log-only mode
    }),
    EffectsModule.forRoot(effects)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
