import { Injectable } from '@angular/core';
import { baseService } from './base-service.service';
import { HttpClient } from '@angular/common/http';
import { Joke } from '../models/joke.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JokesService  extends baseService {

  constructor(http: HttpClient,
    ) {
      super(http, 'b')
  }
  private handleErrorJoke = (errorRes: any) => {
    let errorMessage = 'Unkown Error'
    // if (!errorRes.error|| !errorRes.error.error) {
    // }
    return throwError(errorMessage)
    // switch (errorRes.error.error.message) {

    // }
  };
  public fetchAllJokes(){
    return this.get<Joke[]>('616db6f1aa02be1d445b3e76');
  }
}
