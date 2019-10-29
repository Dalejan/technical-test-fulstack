/**
 * app.reducers
 * Contiene todos los reducers de la app centralizados para 'unirlos'
 */
import { ActionReducerMap } from "@ngrx/store";
import * as reducers from "../app/ngrx/reducers";
import { Comment } from "./classes/comment";
import { Rank } from "./classes/rank";

export interface AppState {
  comments: { comments: Comment[]; errors: string };
  ranks: { ranks: Rank[]; errors: string };
}

export const appReducers: ActionReducerMap<AppState> = {
  comments: reducers.commentsReducer,
  ranks: reducers.ranksReducer
};
