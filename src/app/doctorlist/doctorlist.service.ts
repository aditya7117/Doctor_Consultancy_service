import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from "rxjs";  

@Injectable({
  providedIn: 'root'
})
export class DoctorlistService {

  private empDetailSubject = new BehaviorSubject(null); 
  
  selectDoctor;

  constructor(private router: Router) { }
  DoctorInfo(doctor){
    console.log("doctor service");
    this.selectDoctor=doctor;
    console.log(this.selectDoctor);
    this.router.navigateByUrl('/bookappointment');
    
  }

  getSelectedDoctor(){
    return this.selectDoctor;
  }
}
