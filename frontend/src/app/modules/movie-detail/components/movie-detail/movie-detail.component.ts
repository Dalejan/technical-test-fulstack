/**
 * movie-detail.component
 * Componente encargado de pintar la información de una película
 * sus comentarios y su ranking
 */
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { takeUntil, map, take } from "rxjs/operators";
import { Subject, Observable, of } from "rxjs";
import { MoviesService } from "src/app/services/movies/movies.service";
import { AuthService } from "src/app/services/auth/auth.service";
import { Rank } from "src/app/classes/rank";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducers";
import * as fromRanks from "src/app/ngrx/actions/ranks.actions";

@Component({
  selector: "app-movie-detail",
  templateUrl: "./movie-detail.component.html",
  styleUrls: ["./movie-detail.component.scss"],
  host: { class: "big-cont" } // Para 'colocar' estilos desde el host 'router-outlet'
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  /**
   * Observable que tiene la información de una película
   */
  public movie: any;

  /**
   * Objeto del usuario autenticado
   */
  public user: any;

  /**
   * Bandera para saber si va a crear un rank o actualizar uno existente
   */
  public shouldUpdateRank = false;

  /**
   * Vvalor para controlar las estrellas otorgadas
   */
  public stars: number;

  /**
   * string que contiene el error en caso de no poder consultar el rank
   */
  public errors: string;

  /**
   * Número para manejar el estado del ranking dado
   */
  public rankNumber: number;

  /**
   * id del rank otorgado
   */
  public rank_id: string;

  /**
   * subject para cancelar la subsripción manual una vez se destruya el componente
   */
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  async ngOnInit() {
    this.user = await this.authService.getUser$().toPromise();

    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      this.fetchMovie(params["id"]);
    });
  }

  /**
   * Obtiene la información de la película, su rank y el rank dado por el usuario autenticado
   * @param id string id de la película
   */
  fetchMovie(id) {
    this.moviesService
      .getMovie(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(movie => (this.movie = movie));

    this.store.dispatch(new fromRanks.loadMovieRankAction(id));
    this.store.pipe(takeUntil(this.unsubscribe$)).subscribe(state => {
      const ranks = state.ranks.ranks;
      this.errors = state.ranks.errors;
      // obtiene el rank que otorgó el usuario
      if (!this.user) return;
      if (ranks.filter(rank => rank.user_id === this.user.email)[0]) {
        const rank = ranks.filter(rank => rank.user_id === this.user.email)[0];
        this.stars = rank.value;
        this.rank_id = rank.id;
        this.shouldUpdateRank = true;
      } else {
        this.stars = 0;
        this.shouldUpdateRank = false;
      }

      // calcula el promedio de ranks
      if (!ranks.length) {
        this.rankNumber = 0;
        return;
      }
      this.rankNumber =
        ranks
          .map(rank => rank.value)
          .reduce((total, rank) => {
            return parseInt(total + "") + parseInt(rank + "");
          }) / ranks.length;
    });
  }

  /**
   * Actualiza o crea un rank para una película
   * @param movie_id string id de la película
   * @param user_id string id del usuario
   * @param value number valor del ranking otorgado
   */
  rank(movie_id, user_id, value) {
    if (this.shouldUpdateRank) {
      this.store.dispatch(
        new fromRanks.updateRankAction(new Rank(null, value, user_id, movie_id))
      );
    } else {
      this.store.dispatch(
        new fromRanks.doRankAction(new Rank(null, value, user_id, movie_id))
      );
    }
  }

  /**
   * Elimina el rank que el usuario haya otorgado
   */
  async deleteRank() {
    this.store.dispatch(new fromRanks.deleteMovieRankAction(this.rank_id));
    this.rank_id = null;
  }

  /**
   * Para ingresar en caso de no estar autenticado
   */
  login() {
    this.authService.login();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
