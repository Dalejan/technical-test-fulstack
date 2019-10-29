/**
 * comments-list.component
 * Componente encargado de manejar los comentarios hechos a las películas
 */

import { Component, OnInit, Input } from "@angular/core";
import { MoviesService } from "src/app/services/movies/movies.service";
import { Observable, Subject, from, pipe } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/services/auth/auth.service";
import { takeUntil } from "rxjs/operators";
import { Comment } from "src/app/classes/comment";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducers";
import * as fromComments from "../../../../ngrx/actions/comments.actions";

@Component({
  selector: "app-comments-list",
  templateUrl: "./comments-list.component.html",
  styleUrls: ["./comments-list.component.scss"]
})
export class CommentsListComponent implements OnInit {
  @Input("movie_id") public movie_id: string;
  @Input("user_id") public user_id: string;
  public comments: Comment[];
  public error: string;
  public text = "";
  private user: any;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.fetchComments();

    this.authService
      .getUser$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => (this.user = data));
  }

  /**
   * Realiza un comentario
   * @param text texto del comentario
   */
  comment() {
    if (this.text.trim() !== "") {
      this.store.dispatch(
        new fromComments.doCommentAction(
          new Comment(
            null,
            this.text,
            new Date(),
            null,
            this.user.email,
            this.movie_id
          )
        )
      );
    }
  }

  /**
   * Obtiene la lista de comentarios
   */
  fetchComments() {
    this.store.dispatch(new fromComments.loadCommentsAction(this.movie_id));
    this.store.pipe(takeUntil(this.unsubscribe$)).subscribe(state => {
      this.comments = state.comments.comments;
      this.error = state.comments.errors;
    });
  }

  /**
   * Para loggearse en caso de no estar autenticado
   */
  login() {
    this.authService.login();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
