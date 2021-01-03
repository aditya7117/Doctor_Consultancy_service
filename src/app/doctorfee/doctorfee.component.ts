import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-doctorfee',
  templateUrl: './doctorfee.component.html',
  styleUrls: ['./doctorfee.component.css']
})
export class DoctorfeeComponent implements OnInit {
  feeForm = new FormGroup({
    fee: new FormControl(''),
    account: new FormControl(''),
    holder: new FormControl(''),
    ifsc: new FormControl(''),
    feevalidupto: new FormControl('')
  });
  err="";
  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('clicked');
    console.log(this.feeForm.value);
    this.http.post('http://localhost:3000/profile/fee',this.feeForm.value).subscribe((responseData) => {
      console.log(responseData);
      this.router.navigateByUrl('');
    },(err) => {
      console.log("Error hai");
      this.err = "Please log In......";
    });
  }

}
