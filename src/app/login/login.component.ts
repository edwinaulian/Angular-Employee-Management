import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/service/auth.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private mediaObserver: MediaObserver, private authService: AuthService) { }

  showSpinner: boolean;
  mediaSub: Subscription;
  deviceLg: boolean;
  deviceXs: boolean;
  errorMesssages = false;
  username: string;
  password: string;

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      this.deviceLg = result.mqAlias === 'lg' ? true : false;
      this.deviceXs = result.mediaQuery === "screen and (min-width: 0px) and (max-width: 599.98px)";
    })
  }

  onFormSubmit(loginForm): void {
    if (loginForm.invalid) {
      this.errorMesssages = true;
      return;
    }
    this.postLogin(loginForm);
    this.errorMesssages = false;
  }

  postLogin(loginForm): void {
    this.authService.login(loginForm.value);
  }
}
