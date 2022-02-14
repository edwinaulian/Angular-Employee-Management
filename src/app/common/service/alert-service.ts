import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { appAlertConstants } from '../actionType/alert-constants';

@Injectable()
export class AlertService {

    constructor(private toastrService: ToastrService) { }

    showAlertSuccess(messages) {
        this.toastrService.success(messages, appAlertConstants.SUCCESS);
    }

    showAlertError(messages) {
        this.toastrService.error(messages, appAlertConstants.ERROR);
    }

    showAlertWarning(messages) {
        this.toastrService.warning(messages, appAlertConstants.WARNING);
    }

    showAlertInfo(messages) {
        this.toastrService.info(messages, appAlertConstants.INFO);
    }
}