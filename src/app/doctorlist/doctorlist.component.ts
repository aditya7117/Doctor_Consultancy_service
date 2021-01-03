import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DoctorlistService } from './doctorlist.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {

  Hero;
  err="";
  profileId="";
  profileOwner="";
  doctorFilterForm = new FormGroup({
    specialization: new FormControl('')
  });
  constructor(private http: HttpClient,private service: DoctorlistService,private router: Router) { }

  ngOnInit(): void {
    this.availableDoctor()
  }
  availableDoctor() {
    
    this.http.get('http://localhost:3000/publicdoctorprofiles').subscribe((responseData) => {
    this.Hero = responseData;
    },(err) => {
      this.err = "Something Wents Wrong";
    });
    
  }
  getDoctor(i){
    this.profileId=this.Hero[i]._id;
    this.profileOwner=this.Hero[i].owner;
    console.log(this.Hero[i]);
    this.service.DoctorInfo(this.Hero[i]);
  }

  onFilter(){
    console.log(this.doctorFilterForm.value)
    this.http.post('http://localhost:3000/filterDoctor',this.doctorFilterForm.value).subscribe((responseData) => {
    this.Hero = responseData;
    },(err) => {
      this.err = "Something Wents Wrong";
    });
  }

  clearFilter(){
    this.http.get('http://localhost:3000/publicdoctorprofiles').subscribe((responseData) => {
    this.Hero = responseData;
    },(err) => {
      this.err = "Something Wents Wrong";
    });
  }

}
