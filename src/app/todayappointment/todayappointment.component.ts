import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TodayappointmentService } from './todayappointment.service';

@Component({
  selector: 'app-todayappointment',
  templateUrl: './todayappointment.component.html',
  styleUrls: ['./todayappointment.component.css']
})
export class TodayappointmentComponent implements OnInit {

  Hero;
  err="";
  constructor(private http: HttpClient, private router: Router,private service:TodayappointmentService) { }

  ngOnInit(): void {
    this.todaysAppointment()
  }

  todaysAppointment(){
    this.http.get('http://localhost:3000/TodaysAppointment').subscribe((responseData) => {
    this.Hero=responseData;
    console.log(this.Hero)
    console.log(responseData)
    },(err) => {
      this.err = "Something Wents Wrong";
    });
  }

  getCalls(i){
    this.service.callsInfo(this.Hero[i]);
    this.router.navigateByUrl('/calls')
  }

}
