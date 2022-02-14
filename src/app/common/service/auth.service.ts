import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { appGlobalConstants } from '../actionType/global-constant';
import * as _ from 'lodash';

@Injectable()
export class AuthService {

    public isloggedIn: boolean;
    private userName: string;
    private password: string;
    private loginStatus: string;

    constructor() {
        this.isloggedIn = false;
    }

    login(username: string, password: string) {
        this.isloggedIn = true;
        this.userName = username;
        this.password = password;
        this.loginStatus = username, password;
        return of(this.loginStatus);
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