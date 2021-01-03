import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  me;
  err="";
  heer={
    name:"dcs",
    age:55
  }
  doctor=false;
  patient=true;
  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.myProfile();
  }

  onSubmit() {
    console.log('clicked');
  
    alert("hello");
    this.http.get('http://localhost:3000/profile',).subscribe(responseData => {
      console.log(responseData);
    });

  }
  myProfile() {
    
    this.http.get('http://localhost:3000/users/me').subscribe((responseData) => {
    this.me = responseData;
    if(this.me.userType === 'Doctor'){
      this.doctor = true;
      this.patient = false;
    } else {
      this.doctor = false;
      this.patient = true;
    }
    console.log(this.me.email); 
    },(err) => {
      this.err = "Something Wents Wrong";
      this.router.navigateByUrl('/login');

    });
  }

  logOut(){
    this.http.post('http://localhost:3000/users/logout',this.heer).subscribe((responseData) => {
        console.log('logout');
        this.router.navigateByUrl('');

    },(err) => {
      console.log("Error hai");
      this.err = "Please log In......";
      alert("You Are not loged In. ....");
    });
  }
  logOutAll(){
    this.http.post('http://localhost:3000/users/logoutAll',this.heer).subscribe((responseData) => {
        console.log('logout');
        this.router.navigateByUrl('');

    },(err) => {
      console.log("Error hai");
      this.err = "Please log In......";
      alert("You Are not loged In. ....");
    });
  }

  DeleteYourSelf(){
    this.http.delete('http://localhost:3000/users/me').subscribe((responseData) => {
        console.log('removed');
        this.router.navigateByUrl('');

    },(err) => {
      console.log("Error hai");
      this.err = "Please log In......";
      alert("You Are not loged In. ....");
    });
  }

}
