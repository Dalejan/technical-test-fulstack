/**
 * ranks.actions
 * Acciones de redux encargadas del estado global de los ranks
 */
import { Action } from "@ngrx/store";
import { Rank } from "src/app/classes/rank";

export const DO_RANK = "[RANKS] Rank movie";
export const UPDATE_RANK = "[RANKS] Update movie Rank";
export const RANK_SUCCESS = "[RANKS] Rank or Update rank movie success";
export const RANK_ERROR = "[RANKS] Rank or Update rank movie error";

export const LOAD_MOVIE_RANK = "[RANKS] Load movie Rank";
export const LOAD_MOVIE_RANK_SUCCESS = "[RANKS] Load movie Rank success";
export const LOAD_MOVIE_RANK_ERROR = "[RANKS] Load movie Rank error";

export class doRankAction implements Action {
  readonly type = DO_RANK;
  constructor(public rank: Rank) {}
}

export class doRankSuccessAction implements Action {
  readonly type = RANK_SUCCESS;
  constructor(public rank: Rank) {}
}

export class doRankErrorAction implements Action {
  readonly type = RANK_ERROR;
  constructor(public errors: string) {}
}

export class updateRankAction implements Action {
  readonly type = UPDATE_RANK;
  constructor(public rank: Rank) {}
}

export class updateRankSuccessAction implements Action {
  readonly type = RANK_SUCCESS;
  constructor(public rank: Rank) {}
}

export class updateRankErrorAction implements Action {
  readonly type = RANK_ERROR;
  constructor(public errors: string) {}
}

export class loadMovieRankAction implements Action {
  readonly type = LOAD_MOVIE_RANK;
  constructor(public movie_id: string) {}
}

export class loadMovieRankSuccessAction implements Action {
  readonly type = LOAD_MOVIE_RANK_SUCCESS;
  constructor(public ranks: Rank[]) {}
}

export class loadMovieRankErrorAction implements Action {
  readonly type = LOAD_MOVIE_RANK_ERROR;
  constructor(public errors: string) {}
}

export type Actions =
  | doRankAction
  | updateRankAction
  | doRankSuccessAction
  | doRankErrorAction
  | updateRankSuccessAction
  | updateRankErrorAction
  | loadMovieRankAction
  | loadMovieRankSuccessAction
  | loadMovieRankErrorAction;
