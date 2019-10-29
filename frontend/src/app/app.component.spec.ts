import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { appReducers } from "./app.reducers";
import { EffectsModule } from "@ngrx/effects";
import { effects } from "./ngrx/effects";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot(effects)
      ],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
