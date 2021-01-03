import { Component, OnInit } from '@angular/core';
import { ActivecallService } from '../activecall/activecall.service';
import { TodayappointmentService } from '../todayappointment/todayappointment.service';
import { CallsService } from './calls.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.css']
})
export class CallsComponent implements OnInit {
  fShow = false;
  isShow = false;
  passShow = false;
  prescription=""
  oldprescription:any;
  db=""
  ss=""
  ////////////////////Socket code ////////////

   selectedRoom : String
   user : String;
   msgList : any[]=[];
   msg : String;

  ////////////////End of socket code//////////

  call:any;
  constructor(private callservice: ActivecallService,private callsecond: TodayappointmentService, private socketCommService: CallsService,private http: HttpClient) { }

  sendMessage(){
    this.msgList.push({user: this.user, msg: this.msg, date: new Date().getHours() +":"+ new Date().getMinutes(), from: 'client'})
    this.socketCommService.sendMessageClient(this.user, this.msg,this.selectedRoom);
  }

  ngOnInit(): void {
    this.call=this.callservice.getSelectedCall();
    if(!this.call){
      this.call = this.callsecond.getSelectedCall();
    }
    console.log(this.call)
    this.display();



    ////////////Start of socket code//////////////////

    this.socketCommService.serverJoinRoom().subscribe(
      (res) => {
        console.log('The Server res is ', res)
        this.msgList.push(res)
      },
      (err) => {
        console.log('The Server error is ', err)
      }
    )

    this.socketCommService.serverNewMessage().subscribe(
      (res) => {
        console.log('The Server res is ', res)
        this.msgList.push(res)
      },
      (err) => {
        console.log('The Server error is ', err)
      }
    )

    ////////////End of Socket code //////////////////
  }

  display(){
    console.log(this.call)
    this.selectedRoom=this.call._id;
  }

  /////////////////////////Start of socket code ////////////////

  selectRoom(){
    this.ss="";
    console.log(this.selectedRoom)
    this.http.get('http://localhost:3000/Getmessage').subscribe((responseData:any) => {
          console.log(responseData);
          console.log(responseData.length)
          console.log(responseData[0].mesage.length)
          console.log(responseData[0].mesage)

          for (let i=0;i<responseData.length;i++ ){
            for (let j=0; j<responseData[i].mesage.length;j++){
              this.msgList.push(responseData[i].mesage[j])
            }
          }
          });
    this.socketCommService.joinRoom(this.user, this.selectedRoom);
    this.ss="You have successfully joined please wait to join other."
  }



  /////////////////End of Socket code///////////////////////


  saveChat(){
    this.ss="";
    console.log(this.msgList)

    this.http.post('http://localhost:3000/message',this.msgList).subscribe((responseData) => {
          console.log(responseData);
          this.ss="your chat saved!";
          },(err) => {
          console.log("Error hai");

          });
  }

  writePrescription(){
    this.ss="";
    this.fShow = true;
    this.isShow = false;
    this.passShow = false;
  }
  postpone(){
    this.ss="";
    this.fShow = false;
    this.isShow = false;
    this.passShow = true;
  }

  sendPrescription(){
    const pres = {
      appointmentId : this.selectedRoom,
      prescriptions: this.prescription
    }
    console.log(pres)
    this.http.post('http://localhost:3000/prescription',pres).subscribe((responseData) => {
      console.log(responseData);
      this.ss="Prescription has been sent via Email."
      },(err) => {
      console.log("Error hai");

      });
  }
  GetPrescription(){
    this.ss="";
    this.fShow = false;
    this.isShow = true;
    this.passShow = false;

    this.http.get('http://localhost:3000/Getprescription/'+this.selectedRoom).subscribe((responseData) => {
      console.log(responseData);
      this.oldprescription=responseData
      console.log(this.oldprescription)
      },(err) => {
      console.log("Error hai");

      });

  }

  changeDate(){
    console.log(this.db)
    var data={
      _id:this.selectedRoom,
      dp:this.db
    }
    console.log(data)
    this.http.patch('http://localhost:3000/ModifyAppointment',data).subscribe((responseData) => {
      console.log(responseData);
      this.oldprescription=responseData
      console.log(this.oldprescription)
      },(err) => {
      console.log("Error hai");

      });


  }

  videoCalls(){
    window.open('http://localhost:3002','_blank');
  }

}
