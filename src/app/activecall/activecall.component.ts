import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivecallService } from './activecall.service';

@Component({
  selector: 'app-activecall',
  templateUrl: './activecall.component.html',
  styleUrls: ['./activecall.component.css']
})
export class ActivecallComponent implements OnInit {

  Hero;
  err="";
  profileId="";
  profileOwner="";
  constructor(private http: HttpClient, private router: Router, private service: ActivecallService) { }

  ngOnInit(): void {
    this.availableActiveCalls()
  }

  availableActiveCalls() {

    this.http.get('http://localhost:3000/ActiveCallList').subscribe((responseData) => {
    this.Hero=responseData;
    console.log(this.Hero)
    console.log(responseData)
    },(err) => {
      this.err = "Something Wents Wrong";
    });

  }

  getCalls(i){
    // this.profileId=this.Hero[i]._id;
    // this.profileOwner=this.Hero[i].owner;
    // console.log(this.Hero[i]);
    // //this.service.DoctorInfo(this.Hero[i]);
    this.service.callsInfo(this.Hero[i]);
    this.router.navigateByUrl('/calls')
  }

}
