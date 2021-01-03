import { Component, OnInit } from '@angular/core';
import { DoctorlistService } from '../doctorlist/doctorlist.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { FormControl, FormGroup,Validators,FormBuilder } from '@angular/forms';
declare var Razorpay: any;

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.css']
})
export class BookappointmentComponent implements OnInit {
  // appointmentForm = new FormGroup({
  //   doctorId: new FormControl(''),
  //   doctorFee: new FormControl(''),
  //   appDays: new FormControl(''),
  //   name: new FormControl(''),
  //   email: new FormControl(''),
  //   phone: new FormControl('')
  // });
  paymentForm: FormGroup;
  razorPayData: any;
  loading=false;
  submitted=false;
  available;
  notavail="";
  avail="";

  razorPayOptions = {
    "key": '',
    "amount": '',
    "currency": "INR",
    "name": '',
    "description": "Skartz Payment",
    "order_id": '',
    "handler": (res) => {
      console.log(res);
    }
  };

 doctor:any;
 err="";
 Hero;
 responseData;
 day=[];
 appointment:any;
 BookShow=false;
 isShow=false;
 passShow=false;


  constructor(private doctorservice: DoctorlistService,private http: HttpClient,private fb: FormBuilder,private router:Router) { }


  ngOnInit(): void {
    console.log("Before Display");
    this.doctor=this.doctorservice.getSelectedDoctor();
    console.log(this.doctor);
    console.log("Middle Display");
    this.display();

    this.loading=false;
    this.submitted=false;
    this.createForm();
}

createForm(){
  this.paymentForm = this.fb.group({
    name: ['',[Validators.required]],
    amount: ['',[Validators.required]],
    email: ['',[Validators.required]],
    doctorId: ['',[Validators.required]],
    dp: ['',[Validators.required]],
    doctorname: ['',[Validators.required]]
  });

}

display(){
  console.log("After display");
  console.log(this.doctor);
  this.day = this.doctor.scheduleday.split(",");
}

buyRazorPay(formData: any){
  console.log("click")
  console.log(formData.value)
  console.log(this.paymentForm)

  this.submitted = true;
  this.loading = true;
  this.razorPayData=formData
  this.http.post('http://localhost:3000/razorPayOrder',formData.value).subscribe((res) => {
    console.log(res);
    this.razorPayOptions.key = res['key'];
    this.razorPayOptions.amount = res['value']['amount'];
    this.razorPayOptions.name = this.razorPayData['name'];
    this.razorPayOptions.order_id = res['value']['id'];
    this.razorPayOptions.handler = this.razorPayResponseHandler
    var rzp1 = new Razorpay(this.razorPayOptions);
    rzp1.open();
    console.log('opened');
    this.router.navigateByUrl('/home');
  },(err) => {
    console.log("Error hai");
    //this.err = "Please try again with other Email ID or password is not valid.....";
  });

}

Book(){
  console.log("clicked")
  this.paymentForm.patchValue({
    doctorId: this.doctor.owner,
    amount: this.doctor.fee,
    doctorname: this.doctor.name
   // appDays: this.doctor.scheduleday

  });
  this.BookShow=true;
  this.isShow=false;
  this.passShow=false;
}

// onPayment(){
//   this.appointment=this.appointmentForm.value;
//   console.log(this.appointment);
//   console.log('clicked');
//     console.log(this.appointment.value);
//     console.log("Appointment Form value")
//     console.log(this.appointmentForm.value)
//     this.http.post('http://localhost:3000/paynow',this.appointmentForm.value).subscribe((responseData) => {
//       console.log(responseData);
//       //this.router.navigateByUrl('/otp');
//     },(err) => {
//       console.log(err);
//       this.err = "Failed";
//     });
// }

razorPayResponseHandler(response){
  console.log(response);
}

checkAvalable(){
  console.log('clicked')
  console.log(this.doctor.maxapp)
  console.log(this.paymentForm.value.dp)
  console.log(this.doctor.owner)
  var check = {
    maxapp: this.doctor.maxapp,
    dp:this.paymentForm.value.dp,
    doctorId: this.doctor.owner
  }

  console.log(check)

  this.http.post('http://localhost:3000/AvailableAppoinment',check).subscribe((responseData) => {
    console.log(responseData);
    this.available=responseData
    console.log(this.available.result)
    if(this.available.result === 'Yes Appointment Available!'){
      this.avail = 'Wow , It is available for you';
    } else {
      this.notavail = ' Sorry , Try on other day';
    }
  },(err) => {
    console.log("Error hai");
    this.err = "Please log In......";
  });

}
checkDob(){
  this.notavail="";
  console.log(this.paymentForm.value.dp)
  var selectd= new Date(this.paymentForm.value.dp)
  console.log(selectd.getDate())
  var today = new Date()
  console.log(today)
  if(today.getDate() <= selectd.getDate()){
    this.notavail=""
  }
  else{
    this.notavail="Please select next date!"
  }
}

}
