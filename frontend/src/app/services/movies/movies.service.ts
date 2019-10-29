/**
 * vehicle.service
 * Servicio encargado de consultar la informacipon de theMovieDB
 * Y Enviar datos a la bd propia
 */
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Comment } from "src/app/classes/comment";
import { Rank } from "src/app/classes/rank";

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  private apiURL = environment.movieDB.url;
  private apiKey = environment.movieDB.apiKey;
  private myApiUrl = environment.myApi.url;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Método encargado de obtener las películas de cierto año
   * @param year number - Año de filtro para películas
   * @param page number - Página de resultados
   */
  getMovies(year: number = 2000, page: number = 1): Observable<any> {
    if (year < 2000 || year > 2010) {
      return;
    }

    return this.httpClient
      .get<any>(
        `${this.apiURL}/discover/movie?api_key=${this.apiKey}&sort_by=popularity.asc&year=${year}&page=${page}`
      )
      .pipe(map((data: any) => data.results));
  }

  /**
   * Método encargadod e obtener la información de una película
   * @param id string - id de la película
   */
  getMovie(id: string): Observable<any> {
    return this.httpClient
      .get<any>(`${this.apiURL}/movie/${id}?api_key=${this.apiKey}`)
      .pipe(
        map((data: any) => {
          return {
            id: data.id,
            title: data.title,
            poster_path: data.poster_path,
            release_date: data.release_date,
            adult: data.adult,
            overview: data.overview
          };
        })
      );
  }

  /**
   * Obtiene los comentarios de una película
   * @param id string id de la película
   */
  getComments(id: string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(
      `${this.myApiUrl}/comments?movie_id=${id}`
    );
  }

  /**
   * Comenta en una película específica
   * @param id string id de la película a comentar
   * @param comment objeto de texto y id de usuario
   */
  commentMovie(id: string, comment: Comment) {
    return this.httpClient.post<Comment>(
      `${this.myApiUrl}/comments?movie_id=${id}`,
      { comment }
    );
  }

  /**
   * Obtiene todos los ranks dados a la película
   * @param id string id de la película
   */
  getAllRank(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.myApiUrl}/ranks?movie_id=${id}`);
  }

  /**
   * Da un rank a una película, solo se puede hacer si se está autenticado
   * @param rank rank que se le va a otorgar a la película
   */
  rank(rank: Rank) {
    return this.httpClient.post<Rank>(
      `${this.myApiUrl}/ranks?movie_id=${rank.movie_id}&user_id=${rank.user_id}`,
      { rank }
    );
  }

  /**
   * Actualiza el rank otorgado a una película
   * @param rank rank que se le va a otorgar a la película
   */
  updateRank(rank: Rank) {
    return this.httpClient.patch<Rank>(`${this.myApiUrl}/ranks`, { rank });
  }
}
