import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/service/alert-service';
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
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.userParamService.isNotExsist(this.userParamService.filterValue) ? this.getAllEmployee() : this.getByFilter(this.userParamService.filterValue);
  }

  refresh() {
    this.getAllEmployee();
    this.userParamService.cleanDataFilter();
    this.dataValueFilter = "";
  }

  clickedRows(row: any) {
    this.userParamService.dataEmployee = row;
    localStorage.setItem("dataEmployee", JSON.stringify(this.userParamService.dataEmployee));
    this.router.navigate(["/detailEmployee"], { queryParams: { id: row.id } });
  }

  onEdit(row: any) {
    this.dialog.open(AddUserDialogComponent, {
      width: '100%',
      data: row
    }).afterClosed().subscribe(value => {
      if (value === "edit") {
        this.getAllEmployee();
        this.router.navigate(["/employees"]);
      }
    })
  }

  onDeleted(id: number) {
    this.userServie.deleteDataEmployee(id).subscribe({
      next: (res) => {
        this.alertService.showAlertSuccess('Data has been deleted');
        this.getAllEmployee();
        this.router.navigate(["/employees"]);
      }, error: (err) => {
        alert("Error while deleting the data!");
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userParamService.filterValue = filterValue;
    this.userServie.getDataEmployeeByFilter(filterValue).subscribe({
      next: (res) => {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error: (err) => {
        alert("Error while fetching the data Employee!")
      }
    })
  }

  getByFilter(value) {
    this.userServie.getDataEmployeeByFilter(value).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error: (err) => {
        alert("Error while fetching the data Employee!")
      }
    })
  }

  getAllEmployee() {
    this.userServie.getDataEmployee().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error: (err) => {
        alert("Error while fecthing the data Employee!")
      }
    })
  }

}