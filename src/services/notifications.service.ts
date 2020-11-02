import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlignType, FromType, NotificationType } from 'enums/notifications.enum';

declare var $: any;
@Injectable({
    providedIn: 'root'
})

export class NotificationsService {

    constructor(protected http: HttpClient) {
    }

    showNotification(from: FromType, align: AlignType, type: NotificationType, message) {

        $.notify({
            icon: "notifications",
        }, {
            type: type,
            timer: 1000,
            placement: {
                from: from,
                align: align
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">notifications</i> ' +
                '<span data-notify="message">' + message + '</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '</div>'
        });
    }

}
