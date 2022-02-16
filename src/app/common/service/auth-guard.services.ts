import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { appNavigateTo } from '../actionType/global-constant';
@Injectable()
export class AuthGuardService implements CanActivate {
    mediaSub: Subscription;

    constructor(
        private router: Router,
        private authService: AuthService) { }

    canActivate(): boolean {
        if (this.authService.loggedIn()) {
            return true;
        } else {
            this.router.navigate([appNavigateTo.LOGIN_PAGE]);
            return false;
        }
    }
}