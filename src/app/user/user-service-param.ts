import { Injectable } from "@angular/core";
import { Subscription } from 'rxjs';
import { appGlobalConstants } from "../common/actionType/global-constant";
import * as _ from 'lodash';
@Injectable({
    providedIn: 'root'
})

export class UserParamService {
    dataEmployee: any;
    filterValue: any;
    mediaSub: Subscription;

    constructor() { }

    isNotExsist(obj) {
        return _.isEqual(obj, appGlobalConstants.UNDEFINED_VALUE) || _.isEqual(obj, appGlobalConstants.EMPLTY_VALUE);
    }

    cleanDataFilter() {
        this.filterValue = appGlobalConstants.EMPLTY_VALUE;
    }

}