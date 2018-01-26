import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';


@Component({
    selector: 'app-store-modal',
    templateUrl: './store-modal.component.html',
    styles: [
        `
        #address {
            overflow: auto; 
            resize: none;
        }
        `
    ]
})
export class StoreModalComponent implements OnInit {
    active: boolean;
    body: string;
    title: string;
    onClose: Subject<any>;
    myForm: FormGroup;
    formBuilder: FormBuilder;


    constructor(private _bsModalRef: BsModalRef, formBuilder?: FormBuilder) {
        this.formBuilder = formBuilder;
        this.myForm = this.formBuilder.group({
            name: '',
            address: ''
        });
    }

    ngOnInit(): void {
        this.onClose = new Subject();
    }

    showModal(title: string, body: string, store?: any): void {
        this.title = title;
        this.body =  body;
        this.active = true;
        
        if (store) {
            this.myForm = this.formBuilder.group(store);
        }
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
        this.onClose.next({
            submit: false
        });
        this._bsModalRef.hide();
    }
}