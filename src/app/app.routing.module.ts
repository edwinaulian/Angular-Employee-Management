import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/main-user.component';
import { DetailEmployeeComponent } from './user/detail-employee/detail-employee.component';
import { AuthGuardService } from './common/service/auth-guard.services';

const routes: Routes = [
    { path: 'detailEmployee', component: DetailEmployeeComponent, canActivate: [AuthGuardService] },
    { path: 'employees', component: UserComponent, canActivate: [AuthGuardService] },
    { path: 'contact', component: ContactComponent, canActivate: [AuthGuardService] },
    { path: 'login', component: LoginComponent },
    { path: '', component: LoginComponent }
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