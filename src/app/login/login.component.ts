import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../common/service/auth.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AlertService } from '../common/service/alert-service';
import { appGlobalConstants, appNavigateTo } from '../common/actionType/global-constant';
import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService,
    private mediaObserver: MediaObserver) { }

  showSpinner: boolean;
  mediaSub: Subscription;
  deviceLg: boolean;
  deviceXs: boolean;
  errorMesssages = false;
  retUrl: string = "employees";
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

  postLogin(loginForm) {
    this.authService.login(loginForm.value.username, loginForm.value.password).subscribe(data => {
      if (!_.isEqual(this.retUrl, appGlobalConstants.NULL_VALUE)) {
        this.router.navigate([this.retUrl]);
        this.alertService.showAlertSuccess(`Hello ${data}, Wellcome to EmpMa`);
        localStorage.setItem("login", data);
      } else {
        this.router.navigate([appNavigateTo.LOGIN_PAGE]);
      }
    });
  }

}
