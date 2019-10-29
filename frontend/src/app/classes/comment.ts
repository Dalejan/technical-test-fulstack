export class Comment {
  constructor(
    public id: string,
    public text: string,
    public created_at: Date,
    public updated_at: Date,
    public user_id: string,
    public movie_id: string
  ) {}
}
