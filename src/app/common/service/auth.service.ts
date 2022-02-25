import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { appGlobalConstants } from '../actionType/global-constant';
import { UserService } from 'src/app/user/user-service';
import { AlertService } from './alert-service';
import { Router } from '@angular/router';
import { GlobalServiceParam } from './global-param-service';
import * as _ from 'lodash';
@Injectable()
export class AuthService {

    public isloggedIn: boolean;
    private userName: string;
    private password: string;
    private loginStatus: string;
    retUrl: string = "employees";

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private router: Router,
        private globalServiceParam: GlobalServiceParam,
    ) {
        this.isloggedIn = false;
    }

    login(loginDataValue: Object): void {
        this.userService.postDataUser(loginDataValue).subscribe({
            next: (res) => {
                this.loginSucces(res);
            }, error: () => {
                this.loginFailed();
            }
        })
    }

    loginSucces(data) {
        this.router.navigate([this.retUrl]);
        this.alertService.showAlertSuccess(`Hello ${data.username}, Wellcome to EmpMa`);
        localStorage.setItem("login", JSON.stringify(data));
        this.isloggedIn = true;
        this.userName = data.userName;
        this.password = data.password;
        this.loginStatus = data.username, data.password;
        return of(this.loginStatus);
    }

    loginFailed() {
        this.globalServiceParam.navigateToLoginPage();
    }

    loggedIn() {
        return !!localStorage.getItem("login");
    }

    isUserLoggedIn(): boolean {
        return this.isloggedIn;
    }

    isAdminUser(): boolean {
        if (_.isEqual(this.userName, 'admin')) {
            return true;
        }
        return false;
    }

    logoutUser(): void {
        this.isloggedIn = false;
        this.loginStatus = appGlobalConstants.EMPLTY_VALUE;
    }

} 