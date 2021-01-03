import { Injectable, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable,of, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CallsService implements OnInit{
  private socket = io("http://localhost:4000");


  constructor(private http: HttpClient){}

  ngOnInit(){

  }

  joinRoom(user,room){
    this.socket.emit('new_joinee',{
      name : user,
      room: room
    });
  }

  serverJoinRoom(){
    return new Observable((observer) => {
      this.socket.on('server_new_joinee', (data) => {
          observer.next(data);
      });
    })
  }


  //server_new_message

  serverNewMessage() {
    return new Observable((observer) => {
      this.socket.on('server_new_message', (data) => {
          observer.next(data);
      });
    })
  }


  sendMessageClient(user,msg,room){
    this.socket.emit('client_new_msg',{
      name: user,
      msg: msg,
      room: room
    })
  }

}
