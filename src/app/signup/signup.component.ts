import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true;
  signupForm = new FormGroup({
    firstName: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z]*')]),
    lastName: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z]*')]),
    email: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    userType: new FormControl('',[Validators.required])
  });
  err = "";
  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('clicked');
    console.log(this.signupForm.value);
    this.http.post('http://localhost:3000/users/signup',this.signupForm.value).subscribe((responseData) => {
      console.log(responseData);
      this.router.navigateByUrl('/otp');
    },(err) => {
      console.log("Error hai");
      this.err = "Please try again with other Email ID ";
    });
  }

}
