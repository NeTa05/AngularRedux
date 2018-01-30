import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Injectable()
export class ValidatorService {

  hasError(formControl: AbstractControl, validation: string) : boolean {
  	if (!formControl.errors) {
  		return false;
  	}
  	//('maxlength' in this.myForm.controls['name'].errors)  	
    return ( validation in formControl.errors);
    //return (!formControl.errors) ? false : ( 'maxlength' in formControl.errors);
  }
}
