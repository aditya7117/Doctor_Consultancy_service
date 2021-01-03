import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)])
  });
  err = "";
  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('Clicked');
    console.log(this.loginForm.value);
    this.http.post('http://localhost:3000/users/login',this.loginForm.value).subscribe((responseData) => {
      console.log(responseData);
      //let headerAbc = new HttpHeaders({'abc':'22'});
      //console.log(headerAbc.get('abc'));
      //console.log("test",responseData['token']);
      if (responseData['token']) {
        localStorage.setItem('token', responseData['token']);
      }
      this.router.navigateByUrl('');
    },(err) => {
      this.err = "Email id or password is not valid";
    });
  }

}
