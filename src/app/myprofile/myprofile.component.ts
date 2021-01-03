import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  profile;
  id="";
  doctorprofileForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    userType: new FormControl(''),
    hospital: new FormControl(''),
    department: new FormControl(''),
    qualification: new FormControl(''),
    specialization: new FormControl(''),
    address: new FormControl(''),
    fee: new FormControl(''),
    account: new FormControl(''),
    holder: new FormControl(''),
    ifsc: new FormControl(''),
    feevalidity: new FormControl(''),
    phone: new FormControl(''),
    scheduleday: new FormControl(''),
    scheduletime: new FormControl(''),
    maxapp: new FormControl('')

  });
  err="";
  succupdate="";
  succdelete="";
  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.myProfile();
  }

  myProfile() {
    this.http.get('http://localhost:3000/doctorprofile').subscribe((responseData) => {
    this.profile = responseData;
    console.log(this.profile);
    this.id = this.profile[0]._id;
    this.doctorprofileForm.patchValue({
      name: this.profile[0].name, 
      hospital: this.profile[0].hospital,
      department: this.profile[0].department,
      qualification: this.profile[0].qualification,
      specialization: this.profile[0].specialization,
      address: this.profile[0].address,
      fee: this.profile[0].fee,
      userType: this.profile[0].userType,
      account: this.profile[0].account,
      holder: this.profile[0].holder,
      ifsc: this.profile[0].ifsc,
      feevalidity: this.profile[0].feevalidity,
      phone: this.profile[0].phone,
      scheduleday: this.profile[0].scheduleday,
      scheduletime: this.profile[0].scheduletime,
      maxapp: this.profile[0].maxapp
    });
    },(err) => {
      this.err = "Something Wents Wrong";
    });console.log('clicked');
    
  }

  updateProfile(){
    console.log(this.doctorprofileForm.controls['id'].value)
    let url = `http://localhost:3000/doctorProfile/${this.id}`;
    this.http.patch(url,this.doctorprofileForm.value).subscribe((responseData) => {
      console.log(responseData);
      this.succupdate = "Successfully Updated your profile";
      if(this.doctorprofileForm.value.userType === 'Doctor'){
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
    console.log(this.doctorprofileForm.controls['id'].value)
    let url = `http://localhost:3000/doctorProfile/${this.id}`;
    this.http.delete(url,this.doctorprofileForm.value).subscribe((responseData) => {
      console.log(responseData);
      this.succdelete = "Successfully deleted your profile";
      if(this.doctorprofileForm.value.userType === 'Patient'){
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
    this.router.navigateByUrl('/createprofile');
  }

}
