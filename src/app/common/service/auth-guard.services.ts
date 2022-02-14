import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
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
            this.router.navigate(["/login"]);
            return false;
        }
    }
}