import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/service/alert-service';
import { UserService } from 'src/app/user/user-service';

@Component({
  selector: 'alert-confirm-dialog',
  templateUrl: './alert-confirm.component.html',
  styleUrls: ['./alert-confirm.component.css']
})

export class AlertConfirmDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public rowData: any,
    private dialog: MatDialogRef<any>,
    private router: Router,
    private userServices: UserService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit(): void {
  }

  cancel() {
    this.router.navigate(["/employees"]);
  }

  ok() {
    this.userServices.deleteDataEmployee(this.rowData.id).subscribe({
      next: (res) => {
        this.alertService.showAlertSuccess('Data has been deleted');
        this.dialog.close();
        this.router.navigate(["/employees"]);
      }, error: (err) => {
        alert("Error while deleting the data!");
      }
    })
  }

}