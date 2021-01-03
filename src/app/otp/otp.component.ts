import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  otpForm = new FormGroup({
    otp: new FormControl('')
  });
  err = "";
  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('clicked');
    console.log(this.otpForm.value);
    this.http.post('http://localhost:3000/users/otpVerify',this.otpForm.value).subscribe((responseData) => {
      console.log(responseData);
      this.router.navigateByUrl('/login');
    },(err) => {
      this.err = "OTP Doesn't Match";
    });
  }

}
