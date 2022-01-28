import { Injectable } from '@angular/core';
import { of } from 'rxjs';

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
        if (this.userName == 'admin') {
            return true;
        }
        return false;
    }

    logoutUser(): void {
        this.isloggedIn = false;
        this.loginStatus = "";
    }

} 