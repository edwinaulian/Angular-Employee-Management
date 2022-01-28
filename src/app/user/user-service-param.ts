import { Injectable } from "@angular/core";
import { UserService } from "./user-service";
import { Subscription } from 'rxjs';
@Injectable({
    providedIn: 'root'
})

export class UserParamService {
    dataEmployee: any;
    filterValue: any;
    mediaSub: Subscription;

    constructor(
        private userService: UserService
    ) { }

    isNotExsist(obj) {
        return obj === undefined || obj === "";
    }

    cleanDataFilter() {
        this.filterValue = "";
    }

}