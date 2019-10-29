/**
 * movie-image.pipe
 * Pipe encargada de usar el valor de 'path' para la imagen de la película y retornar la url de
 * la imagen en el servidor de multimedia de themoviedb
 */
import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "../../../environments/environment";

@Pipe({
  name: "movieImage"
})
export class MovieImagePipe implements PipeTransform {
  private imgUrl = environment.movieDB.imgUrl;
  private apyKey = environment.movieDB.apiKey;

  transform(url: string): any {
    return `${this.imgUrl}/t/p/w200${url}?api_key=${this.apyKey}`;
  }
}
