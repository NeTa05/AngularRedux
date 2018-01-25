import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styles: [
        `
        #address {
            overflow: auto; 
            resize: none;
        }
        `
    ]
})
export class ConfirmationModalComponent implements OnInit {
    public active: boolean;
    public body: string;
    public title: string;
    public onClose: Subject<any>;

    constructor(private _bsModalRef: BsModalRef) {
    }

    ngOnInit(): void {
        this.onClose = new Subject();
    }

    showConfirmationModal(title: string, body: string): void {
        this.title = title;
        this.body =  body;
        this.active = true;
    }

    onSubmit(form: any): void {
        this.active = false;
        this.onClose.next({
            submit: true,
            store: {
                address: form.address,
                name: form.name
            }
        });
        this._bsModalRef.hide();
    }

    onCancel(): void {
        this.active = false;
        this.onClose.next(false);
        this._bsModalRef.hide();
    }

    hideConfirmationModal(): void {
        this.active = false;
        this.onClose.next(null);
        this._bsModalRef.hide();
    }
}