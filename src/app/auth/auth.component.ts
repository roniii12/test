import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/account/auth.service';
import { User } from '../core/models/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoading = false;
  error: string = null;

  private routeSub: Subscription;
  private storeSub: Subscription;
  authForm:FormGroup

  constructor(
    private router:Router,
    private authService:AuthService
  ) {}

  ngOnInit() {

    this.initForm();
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;


    this.isLoading = true;

    const authObs:Observable<User> = this.authService.login({email, password});

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.initForm();
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private initForm(){
    let emailAuth = '';
    let passwordAuth = '';
    this.authForm = new FormGroup({
      email: new FormControl(emailAuth , [Validators.required, Validators.email]),
      password: new FormControl(passwordAuth, Validators.required)// this.validatePassword])
    })
  }
}
