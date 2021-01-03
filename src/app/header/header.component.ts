import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  err="";
  heer = {
    name:"sana",
    age:22
  }
  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
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
}
