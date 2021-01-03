import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ActivecallService {

  selectCall;
  constructor(private router: Router) { }

  callsInfo(call){
    console.log("dcall service service");
    this.selectCall=call;
    console.log(this.selectCall);

  }

  getSelectedCall(){
    return this.selectCall;
  }

}
