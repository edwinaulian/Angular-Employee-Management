import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/main-user.component';
import { DetailEmployeeComponent } from './user/detail-employee/detail-employee.component';
import { AuthGuardService } from './common/service/auth-guard.services';
import { appGlobalConstants } from './common/actionType/global-constant';

const routes: Routes = [
    { path: appGlobalConstants.DETAIL_EMPLOYEE, component: DetailEmployeeComponent, canActivate: [AuthGuardService] },
    { path: appGlobalConstants.EMPLOYEES, component: UserComponent, canActivate: [AuthGuardService] },
    { path: appGlobalConstants.CONTACT, component: ContactComponent, canActivate: [AuthGuardService] },
    { path: appGlobalConstants.LOGIN, component: LoginComponent },
    { path: appGlobalConstants.EMPLTY_VALUE, component: LoginComponent }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true }),
    ],
    exports: [
        RouterModule
    ],
    declarations: [],
})
export class AppRoutingModule { }