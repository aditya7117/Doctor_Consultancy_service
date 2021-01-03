import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allappointment',
  templateUrl: './allappointment.component.html',
  styleUrls: ['./allappointment.component.css']
})
export class AllappointmentComponent implements OnInit {

  Hero;
  err="";

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.AllAppointment()
  }
  AllAppointment(){
    this.http.get('http://localhost:3000/AllAppointment').subscribe((responseData) => {
    this.Hero=responseData;
    console.log(this.Hero)
    console.log(responseData)
    },(err) => {
      this.err = "Something Wents Wrong";
    });
  }

}
