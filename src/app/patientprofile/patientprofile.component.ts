import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patientprofile',
  templateUrl: './patientprofile.component.html',
  styleUrls: ['./patientprofile.component.css']
})
export class PatientprofileComponent implements OnInit {
  patientprofileForm = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z]*')]),
    age: new FormControl('',[Validators.required]),
    userType: new FormControl('',[Validators.required ]),
    address: new FormControl('',[Validators.required ]),
    phone: new FormControl('',[Validators.required, Validators.pattern(/^[6-9]\d{9}$/) ]),
    weight: new FormControl('',[Validators.required, Validators.pattern('[0-9]*')]),
    bloodGroup: new FormControl('',[Validators.required ]),
    disease: new FormControl('',[Validators.required ]),
    description: new FormControl('')
  });
  err="";
  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('clicked');
    console.log(this.patientprofileForm.value);
    this.http.post('http://localhost:3000/patientprofile',this.patientprofileForm.value).subscribe((responseData) => {
      console.log(responseData);
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

}
