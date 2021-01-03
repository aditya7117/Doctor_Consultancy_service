import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodayappointmentService {
  selectCall;
  constructor() { }
  callsInfo(call){
    console.log("dcall service service");
    this.selectCall=call;
    console.log(this.selectCall);
    
  }

  getSelectedCall(){
    return this.selectCall;
  }
  
}
