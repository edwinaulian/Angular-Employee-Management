import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Component
import { AppComponent } from './app.component';
import { UserComponent } from './user/main-user.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AddUserDialogComponent } from './user/dialog/dialog-user.component';
import { UserTableComponent } from './user/user-table/user-table.component';
import { DetailEmployeeComponent } from './user/detail-employee/detail-employee.component';
import { AlertConfirmDialogComponent } from './common/component/alert-confirm.component';

//angular material
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule, } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ErrorStateMatcher, MatNativeDateModule, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

//services
import { AuthService } from './common/service/auth.service';
import { AuthGuardService } from './common/service/auth-guard.services';
import { AlertService } from './common/service/alert-service';
import { GlobalServiceParam } from './common/service/global-param-service';

//routing
import { AppRoutingModule } from './app.routing.module';

//other
import 'hammerjs';
import { SearchPipe } from './common/pipe/seach-pipe';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    UserComponent,
    ContactComponent,
    UserTableComponent,
    AddUserDialogComponent,
    DetailEmployeeComponent,
    SearchPipe,
    AlertConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDividerModule,
    HttpClientModule,
    SimpleNotificationsModule,
    MatTooltipModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
      positionClass: 'toast-bottom-right'
    }),
  ],
  providers: [
    AuthGuardService, AuthService, AlertService, GlobalServiceParam,
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
