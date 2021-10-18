export interface Joke {
  id:number;
  category:string;
  setup?:string;
  joke?:string;
  type:string;
  delivery:string;
  flags: JokeFlags;
}
export interface JokeFlags {
  nsfw:boolean;
  religious:boolean;
  political:boolean;
  racist:boolean;
  sexist:boolean;
}
