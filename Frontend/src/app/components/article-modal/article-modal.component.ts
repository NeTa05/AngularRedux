import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ValidatorService } from '../../services/validator.service';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
    selector: 'app-article-modal',
    templateUrl: './article-modal.component.html',
    styles: [
        `
        #description {
            overflow: auto; 
            resize: none;
        }
        `
    ]
})
export class ArticleModalComponent implements OnInit {
    active: boolean;
    body: string;
    title: string;
    onClose: Subject<any>;
    myForm: FormGroup;
    formBuilder: FormBuilder;
    submitted: boolean;


    constructor(private _bsModalRef: BsModalRef, formBuilder: FormBuilder, private validatorService: ValidatorService) {
        this.formBuilder = formBuilder;
       // this.validatorService.has
        this.myForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
            description: ['', [Validators.required, Validators.maxLength(255)]],
            price: ['', [Validators.required, Validators.max(100) ]],
            total_in_shelf: ['', [Validators.required, Validators.max(100) ]],
            total_in_vault: ['', [Validators.required, Validators.max(100) ]],
        });
    }

    ngOnInit(): void {
        this.onClose = new Subject();
    }

    showModal(title: string, article?: any): void {
        this.title = title;
        this.active = true;
        
        if (article) {
            this.myForm = this.formBuilder.group(article);
        }
    }

    onSubmit(form: any): void {
        
        this.submitted = true;
        if (this.myForm.valid) {
            this.active = false;
            this.onClose.next({
                submit: true,
                article: {
                    name: form.name,
                    description: form.description,
                    price: form.price,
                    total_in_shelf: form.total_in_shelf,
                    total_in_vault: form.total_in_vault
                }
            });
            this._bsModalRef.hide();
        }
    }

    onCancel(): void {
        this.active = false;
        this.onClose.next({
            submit: false
        });
        this._bsModalRef.hide();
    }
}