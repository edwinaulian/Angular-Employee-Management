import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../common/service/auth.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { appNavigateTo } from '../common/actionType/global-constant';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit, OnDestroy {
  mediaSub: Subscription;
  deviceXs: boolean;
  deviceLg: boolean;
  deviceSm: boolean;
  deviceMd: boolean;

  constructor(
    private mediaObserver: MediaObserver,
    private router: Router, 
    private authService: AuthService) { }

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      this.deviceLg = result.mqAlias === 'lg' ? true : false;
      this.deviceXs = result.mediaQuery === "screen and (min-width: 0px) and (max-width: 599.98px)";
      this.deviceSm = result.mqAlias === 'sm' ? true : false;
      this.deviceMd = result.mqAlias === 'md' ? true : false;
    })
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate([appNavigateTo.LOGIN_PAGE]);
  }

}
