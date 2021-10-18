import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Joke } from '../../core/models/joke.model';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})
export class JokesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:{joke:Joke,jokesRandom:Joke[]}
  ) { }
  ngOnInit(): void {
  }

}
