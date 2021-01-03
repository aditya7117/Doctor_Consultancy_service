import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilebar',
  templateUrl: './profilebar.component.html',
  styleUrls: ['./profilebar.component.css']
})
export class ProfilebarComponent implements OnInit {

  profile;
  id="";
  age;
  patientprofileForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    age: new FormControl(''),
    userType: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    weight: new FormControl(''),
    bloodGroup: new FormControl(''),
    disease: new FormControl(''),
    description: new FormControl('')
  });
  err="";
  succupdate="";
  succdelete="";

  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.myProfile();

    var year : any;
    year = this.profile[0].split("-")
    this.age = year;

  }

  myProfile() {
    this.http.get('http://localhost:3000/patientprofile').subscribe((responseData) => {
    this.profile = responseData;
    console.log(this.profile);
    this.id = this.profile[0]._id;
    this.patientprofileForm.patchValue({
      name: this.profile[0].name, 
      age: new Date(this.profile[0].age).getFullYear(),
      address: this.profile[0].address,
      phone: this.profile[0].phone,
      weight: this.profile[0].weight,
      disease: this.profile[0].disease,
      description: this.profile[0].description,
      userType: this.profile[0].userType,
      bloodGroup: this.profile[0].bloodGroup
    });
    },(err) => {
      this.err = "Something Wents Wrong";
    });console.log('clicked');
    
  }

  updateProfile(){
    console.log(this.patientprofileForm.controls['id'].value)
    let url = `http://localhost:3000/patientProfile/${this.id}`;
    this.http.patch(url,this.patientprofileForm.value).subscribe((responseData) => {
      console.log(responseData);
      this.succupdate = "Successfully Updated your profile";
      if(this.patientprofileForm.value.userType === 'Patient'){
        this.router.navigateByUrl('/home');
      } else {
        this.router.navigateByUrl('/home');
      }
    },(err) => {
      console.log("Error hai");
      this.err = "Please log In......";
    });
  }

  DeleteProfile(){
    console.log(this.patientprofileForm.controls['id'].value)
    let url = `http://localhost:3000/patientProfile/${this.id}`;
    this.http.delete(url,this.patientprofileForm.value).subscribe((responseData) => {
      console.log(responseData);
      this.succdelete = "Successfully deleted your profile";
      if(this.patientprofileForm.value.userType === 'Patient'){
        this.router.navigateByUrl('/home');
      } else {
        this.router.navigateByUrl('/home');
      }
    },(err) => {
      console.log("Error hai");
      this.err = "Please log In......";
    });
  }

  createProfile(){
    this.router.navigateByUrl('/Patientprofile');
  }

}
