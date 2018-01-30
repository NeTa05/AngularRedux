import { CommonService } from './common.service';
import { ValidatorService } from './validator.service';

export const Services: Array<any> = [
  {provide: CommonService, useClass: CommonService},
  {provide: ValidatorService, useClass: ValidatorService}
];
