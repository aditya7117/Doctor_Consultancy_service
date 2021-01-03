import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  fShow = true;
  isShow = false;
  passShow = false;
  err="";
  otp="";
  mail="";
  otpnot="";
  ematch ="";
  forgotPasswordForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  });
  otpForm = new FormGroup({
    otp: new FormControl('',[Validators.required,Validators.pattern('[0-9]*')])
  });

  passwordForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')

  });
  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
  }

  sendOTP(){
    console.log(this.forgotPasswordForm.value);
    this.http.post('http://localhost:3000/users/sendforgotmail',this.forgotPasswordForm.value).subscribe((responseData) => {
      console.log(responseData);
      this.fShow = !this.fShow;
      this.isShow = !this.isShow;
      this.mail= "OTP has been sent to you...";
    },(err) => {
      console.log("Error hai");
      this.err = "Email Id Not Register with us";
    }); 
  }
  verifyOTP(){
    console.log('clicked');
    console.log(this.otpForm.value);
    this.http.post('http://localhost:3000/users/otpVerify',this.otpForm.value).subscribe((responseData) => {
      console.log(responseData);
      this.isShow = !this.isShow;
      this.passShow = !this.passShow;
      this.otp='OTP has been matched';
    },(err) => {
      this.otpnot = "OTP Doesn't Match";
    });
  }

  savePassword(){
    this.http.patch('http://localhost:3000/users/me',this.passwordForm.value).subscribe((responseData) => {
        this.router.navigateByUrl('/home');
    },(err) => {
      console.log("Error hai");
      this.ematch = "Please Use Same OPT verified Email";
    });
  }

}
