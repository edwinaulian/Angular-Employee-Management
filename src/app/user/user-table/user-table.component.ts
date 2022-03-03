import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { appGlobalConstants, appMessagesAlert, appNavigateTo } from 'src/app/common/actionType/global-constant';
import { AlertConfirmDialogComponent } from 'src/app/common/component/alert-confirm.component';
import { AlertService } from 'src/app/common/service/alert-service';
import { GlobalServiceParam } from 'src/app/common/service/global-param-service';
import { AddUserDialogComponent } from '../dialog/dialog-user.component';
import { UserService } from '../user-service';
import { UserParamService } from '../user-service-param';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})

export class UserTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  mydate = new Date();
  displayedColumns: string[] = ['id', 'username', 'firstName', 'lastName', 'email', 'birthDate', 'basicSalary', 'status', 'group', 'description', 'action'];
  dataSource: MatTableDataSource<any>;
  dataValueFilter: any;

  constructor(
    private dialog: MatDialog,
    private userServie: UserService,
    private router: Router,
    private userParamService: UserParamService,
    private globalServiceParam: GlobalServiceParam,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.userParamService.isNotExsist(this.userParamService.filterValue) ? this.getAllEmployee() : this.getByFilter(this.userParamService.filterValue, this.userParamService.isFilter);
  }

  refresh() {
    this.getAllEmployee();
    this.userParamService.cleanDataFilter();
    this.dataValueFilter = appGlobalConstants.EMPLTY_VALUE;
  }

  clickedRows(row: any) {
    this.userParamService.dataEmployee = row;
    localStorage.setItem("dataEmployee", JSON.stringify(this.userParamService.dataEmployee));
    this.router.navigate([appNavigateTo.DETAIL_EMPLOYEE_PAGE], { queryParams: { id: row.id } });
  }

  onEdit(row: any) {
    this.dialog.open(AddUserDialogComponent, {
      width: '100%',
      data: row
    }).afterClosed().subscribe(value => {
      if (value === "edit") {
        this.getAllEmployee();
        this.globalServiceParam.navigateToEmployeesPage();
      }
    })
  }

  onDeleted(row: any) {
    this.dialog.open(AlertConfirmDialogComponent, {
      width: '50%',
      data: row
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const isFilter = true;
    this.userParamService.filterValue = filterValue;
    this.userParamService.isFilter = isFilter;
    this.getByFilter(filterValue, isFilter);
  }

  getByFilter(filterValue, isFilter) {
    this.userServie.getDataEmployeeByFilter(filterValue).subscribe({
      next: (res) => {
        if (isFilter) {
          this.dataSource.filter = filterValue.trim().toLowerCase();
        }
        this.getFilterValue(res);
      }, error: (err) => {
        this.errorInfoFetchingData();
      }
    })
  }

  getAllEmployee() {
    this.userServie.getDataEmployee().subscribe({
      next: (res) => {
        this.getFilterValue(res);
      }, error: (err) => {
        this.errorInfoFetchingData();
      }
    })
  }

  errorInfoFetchingData() {
    this.alertService.showAlertError(appMessagesAlert.ERROR_WHILE_FETCHING_DATA);
  }

  getFilterValue(res) {
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}