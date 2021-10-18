import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/account/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'jokes' ,pathMatch:'full'},
  {path:'login',loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)},
  {path:'jokes',loadChildren:()=>import('./gallery/gallery.module').then(m=>m.GalleryModule),canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
