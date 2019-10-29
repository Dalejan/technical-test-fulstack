/**
 * ranks.effects
 * Encargado de manejar los efectos de correspondientes a las acciones de los ranks
 */

import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { map, catchError, switchMap } from "rxjs/operators";
import * as fromRanks from "../actions/ranks.actions";

import { Router } from "@angular/router";

import { of } from "rxjs";
import { Rank } from "src/app/classes/rank";
import { MoviesService } from "src/app/services/movies/movies.service";

@Injectable()
export class ranksEffects {
  /**
   * doRank$ - effect : Efecto encargado de crear un rank
   */
  @Effect()
  doRank$ = this.actions$.pipe(
    ofType(fromRanks.DO_RANK),
    map((action: Rank) => action),
    switchMap((payload: any) => {
      return this.moviesService.rank(payload.rank).pipe(
        map(rank => {
          return new fromRanks.doRankSuccessAction(rank);
        }),
        catchError(error => {
          return of(new fromRanks.doRankErrorAction(error));
        })
      );
    })
  );

  /**
   * updateRank$ - effect : Efecto encargado de actualizar un rank
   */
  @Effect()
  updateRank$ = this.actions$.pipe(
    ofType(fromRanks.UPDATE_RANK),
    map((action: Rank) => action),
    switchMap((payload: any) => {
      return this.moviesService.updateRank(payload.rank).pipe(
        map(rank => {
          return new fromRanks.updateRankSuccessAction(rank);
        }),
        catchError(error => {
          return of(new fromRanks.updateRankErrorAction(error));
        })
      );
    })
  );

  /**
   * fetchRanks$ - effect : Efecto encargado de crear un comentario
   */
  @Effect()
  fetchRanks$ = this.actions$.pipe(
    ofType(fromRanks.LOAD_MOVIE_RANK),
    map((action: string) => action),
    switchMap((payload: any) => {
      return this.moviesService.getAllRank(payload.movie_id).pipe(
        map(ranks => {
          return new fromRanks.loadMovieRankSuccessAction(ranks);
        }),
        catchError(error => {
          return of(new fromRanks.loadMovieRankErrorAction(error));
        })
      );
    })
  );

  /**
   * deleteRank$ - effect : Efecto encargado de crear un comentario
   */
  @Effect()
  deleteRank$ = this.actions$.pipe(
    ofType(fromRanks.DELETE_MOVIE_RANK),
    map((action: string) => action),
    switchMap((payload: any) => {
      return this.moviesService.deleteRank(payload.rank_id).pipe(
        map(rank_id => {
          return new fromRanks.deleteMovieRankSuccessAction(rank_id);
        }),
        catchError(error => {
          return of(new fromRanks.deleteMovieRankErrorAction(error));
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
    private router: Router
  ) {}
}
