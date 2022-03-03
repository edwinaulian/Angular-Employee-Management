import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { GlobalServiceParam } from 'src/app/common/service/global-param-service';
import { UserParamService } from './../user-service-param';

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
    public mediaObserver: MediaObserver,
    private globalServiceParam: GlobalServiceParam,
    private userParamService: UserParamService,
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
    this.userParamService.isFilter = false;
    this.globalServiceParam.navigateToEmployeesPage();
  }

}