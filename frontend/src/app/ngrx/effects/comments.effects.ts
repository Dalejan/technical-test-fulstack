/**
 * comments.effects
 * Encargado de manejar los efectos de correspondientes a las acciones de los commentarios
 */

import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { map, catchError, switchMap } from "rxjs/operators";
import * as fromComments from "../actions/comments.actions";

import { Router } from "@angular/router";

import { of } from "rxjs";
import { Comment } from "src/app/classes/comment";
import { MoviesService } from "src/app/services/movies/movies.service";

@Injectable()
export class commentsEffects {
  /**
   * comment$ - effect : Efecto encargado de crear un comentario
   */
  @Effect()
  comment$ = this.actions$.pipe(
    ofType(fromComments.DO_COMMENT),
    map((action: Comment) => action),
    switchMap((payload: any) => {
      return this.moviesService
        .commentMovie(payload.comment.movie_id, payload.comment)
        .pipe(
          map(comment => {
            return new fromComments.doCommentSuccessAction(comment);
          }),
          catchError(error => {
            return of(new fromComments.doCommentErrorAction(error));
          })
        );
    })
  );

  /**
   * fetchComments$ - effect : Efecto encargado de cargar los comentarios
   */
  @Effect()
  fetchComments$ = this.actions$.pipe(
    ofType(fromComments.LOAD_COMMENTS),
    map((action: string) => {
      return action;
    }),
    switchMap((payload: any) => {
      return this.moviesService.getComments(payload.movie_id).pipe(
        map(comments => {
          return new fromComments.loadCommentsSuccessAcion(comments);
        }),
        catchError(error => {
          return of(new fromComments.loadCommentsErrorAcion(error));
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
