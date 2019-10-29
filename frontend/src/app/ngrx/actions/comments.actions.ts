/**
 * comment.actions
 * Acciones de redux encargadas del estado global de los filtros
 */
import { Action } from "@ngrx/store";
import { Comment } from "src/app/classes/comment";

export const DO_COMMENT = "[COMMENTS] Comment movie";
export const DO_COMMENT_SUCCESS = "[COMMENTS] Comment movie success";
export const DO_COMMENT_ERROR = "[COMMENTS] Comment movie error";

export const LOAD_COMMENTS = "[COMMENTS] Load comments";
export const LOAD_COMMENTS_SUCCESS = "[COMMENTS] Load comments success";
export const LOAD_COMMENTS_ERROR = "[COMMENTS] Load comments error";

export class doCommentAction implements Action {
  readonly type = DO_COMMENT;
  constructor(public comment: Comment) {}
}

export class doCommentSuccessAction implements Action {
  readonly type = DO_COMMENT_SUCCESS;
  constructor(public comment: Comment) {}
}

export class doCommentErrorAction implements Action {
  readonly type = DO_COMMENT_ERROR;
  constructor(public error: string) {}
}

export class loadCommentsAction implements Action {
  readonly type = LOAD_COMMENTS;
  constructor(public movie_id: string) {
    console.log("load comments!");
  }
}

export class loadCommentsSuccessAcion implements Action {
  readonly type = LOAD_COMMENTS_SUCCESS;
  constructor(public comments: Comment[]) {}
}

export class loadCommentsErrorAcion implements Action {
  readonly type = LOAD_COMMENTS_ERROR;
  constructor(public error: string) {}
}

export type Actions =
  | doCommentAction
  | doCommentSuccessAction
  | doCommentErrorAction
  | loadCommentsAction
  | loadCommentsSuccessAcion
  | loadCommentsErrorAcion;
