import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/common/service/alert-service';
import { UserService } from 'src/app/user/user-service';
import { appMessagesAlert } from '../actionType/global-constant';
import { GlobalServiceParam } from '../service/global-param-service';
@Component({
  selector: 'alert-confirm-dialog',
  templateUrl: './alert-confirm.component.html',
  styleUrls: ['./alert-confirm.component.css']
})

export class AlertConfirmDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public rowData: any,
    private dialog: MatDialogRef<any>,
    private userServices: UserService,
    private alertService: AlertService,
    private globalServiceParam: GlobalServiceParam,
  ) { }

  ngOnInit(): void { }

  cancel() {
    this.globalServiceParam.navigateToEmployeesPage();
  }

  ok() {
    this.userServices.deleteDataEmployee(this.rowData.id).subscribe({
      next: (res) => {
        this.alertService.showAlertSuccess(appMessagesAlert.SUCESS_DELETED_DATA_EMPLOYEES);
        this.dialog.close();
        this.globalServiceParam.navigateToEmployeesPage();
      }, error: (err) => {
        alert(appMessagesAlert.ERROR_WHILE_DELETING_THE_DATA);
      }
    })
  }

}