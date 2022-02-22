import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { GlobalServiceParam } from './global-param-service';
@Injectable()
export class AuthGuardService implements CanActivate {
    mediaSub: Subscription;

    constructor(
        private globalServiceParam: GlobalServiceParam,
        private authService: AuthService) { }

    canActivate(): boolean {
        if (this.authService.loggedIn()) {
            return true;
        } else {
            this.globalServiceParam.navigateToLoginPage();
            return false;
        }
    }
}