import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { appNavigateTo } from 'src/app/common/actionType/global-constant';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.css']
})

export class DetailEmployeeComponent implements OnInit {
  detailDataEmployee: any;
  mediaSub: Subscription;
  deviceXs: boolean;
  deviceLg: boolean;
  deviceSm: boolean;
  deviceMd: boolean;

  constructor(
    private router: Router,
    public mediaObserver: MediaObserver,
  ) { }

  ngOnInit(): void {
    this.detailDataEmployee = localStorage.getItem("dataEmployee");
    this.detailDataEmployee = JSON.parse(this.detailDataEmployee);
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

  onBack() {
    this.router.navigate([appNavigateTo.EMPLOYEES_PAGE]);
  }

}