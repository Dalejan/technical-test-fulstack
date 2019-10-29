import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MovieItemComponent } from "./components/movie-item/movie-item.component";

import {
  LazyLoadImageModule,
  intersectionObserverPreset
} from "ng-lazyload-image";
import { MovieImagePipe } from "./pipes/movie-image.pipe";

@NgModule({
  declarations: [MovieItemComponent, MovieImagePipe],
  imports: [
    CommonModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
    })
  ],
  exports: [MovieItemComponent, LazyLoadImageModule, MovieImagePipe]
})
export class SharedModule {}
