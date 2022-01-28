import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AlertService {

    constructor(private toastrService: ToastrService) { }

    showAlertSuccess(messages) {
        this.toastrService.success(messages, 'Success');
    }

    showAlertError(messages) {
        this.toastrService.error(messages, 'Error');
    }

    showAlertWarning(messages) {
        this.toastrService.warning(messages, 'Warning');
    }

    showAlertInfo(messages) {
        this.toastrService.info(messages, 'Info');
    }
}