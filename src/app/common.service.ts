import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  NumberConverter = (value: any) => {
    if (value === null || value === undefined || typeof value === 'number') {
        return value;
    }

    return parseFloat(value.toString());
  }
}
