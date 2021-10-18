import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JokesService } from '../core/services/jokes.service';
import { Joke } from '../core/models/joke.model';
import { MatDialog } from '@angular/material/dialog';
import { JokesComponent } from './jokes/jokes.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {

  constructor(
    private jokesService:JokesService,
    private dialog:MatDialog
  ) { }
  jokesSub:Subscription;
  jokes:Joke[];
  displayedColumns:string[];
  dataSource;
  ngOnInit(): void {
    this.jokesSub = this.jokesService.fetchAllJokes().subscribe(jokes=>{
      this.displayedColumns = ['position', 'joke', 'type', 'nsfw','religious','political','racist','sexist'];
      if(jokes?.length > 0){
        this.jokes = jokes;
        this.dataSource = jokes.map((joke,index)=>({

          position:index+1,
          joke:joke.joke || joke.setup,
          type:joke.type,
          nsfw:joke.flags.nsfw,
          religious:joke.flags.religious,
          political:joke.flags.political,
          racist:joke.flags.racist,
          sexist:joke.flags.sexist
        }))
      }
    })
  }
  onRowClick(row){
    const randomJokes = this.jokes.map((jokeItem) => {
      if(jokeItem.type === row.type ){
        const isRandomChoice = Math.random() < 0.5;
        if(isRandomChoice){
          return jokeItem;
        }
      }
      return null;
    }).filter(jokeItem=>jokeItem)
    const currentJoke = this.jokes.filter(joke=>joke.id === row.id)
    this.dialog.open(JokesComponent,{
      width:'600px',
      height: '800px',
      maxHeight: '80%',
      data:{joke:currentJoke,jokesRandom:randomJokes}
    })
  }

  ngOnDestroy(){
    this.jokesSub.unsubscribe();
  }

}
