import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { JokesComponent } from './jokes/jokes.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    GalleryComponent,
    JokesComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatTableModule,
    RouterModule.forChild([{path:'',component:GalleryComponent}]),
    MatDialogModule,
    MatButtonModule
  ]
})
export class GalleryModule { }
