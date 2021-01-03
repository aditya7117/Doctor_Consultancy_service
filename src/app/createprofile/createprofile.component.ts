import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createprofile',
  templateUrl: './createprofile.component.html',
  styleUrls: ['./createprofile.component.css']
})
export class CreateprofileComponent implements OnInit {
  doctorprofileForm = new FormGroup({
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
  constructor(private http: HttpClient, private router:Router,private fb: FormBuilder) { 
    this.createForm();
  }
  createForm() {
    this.doctorprofileForm = this.fb.group({
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
  }


  ngOnInit(): void {
  }

  onSubmit() {
    console.log('clicked');
    console.log(this.doctorprofileForm.value);
    this.http.post('http://localhost:3000/doctorprofile',this.doctorprofileForm.value).subscribe((responseData) => {
      console.log(responseData);
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

  }

