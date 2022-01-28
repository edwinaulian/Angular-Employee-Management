import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.css']
})

export class UserComponent implements OnInit, OnDestroy {
  mediaSub: Subscription;
  deviceXs: boolean;
  deviceLg: boolean;
  deviceSm: boolean;
  deviceMd: boolean;

  constructor(
    public mediaObserver: MediaObserver
  ) { }

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      this.deviceLg = result.mqAlias === 'lg' ? true : false;
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
      this.deviceSm = result.mqAlias === 'sm' ? true : false;
      this.deviceMd = result.mqAlias === 'md' ? true : false;
    })
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

}
