import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { appNavigateTo } from "../actionType/global-constant";

@Injectable()
export class GlobalServiceParam {

    constructor(private router: Router) { }

    navigateToLoginPage() {
        this.router.navigate([appNavigateTo.LOGIN_PAGE]);
    }

    navigateToEmployeesPage() {
        this.router.navigate([appNavigateTo.EMPLOYEES_PAGE]);
    }
}