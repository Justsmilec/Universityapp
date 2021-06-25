
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Subjectpost } from '../model/posts/subjectpost';
import { NgZone } from '@angular/core';
  


export class SingleSubjectPostWebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8081/ws';  // endPoint created in spring consumer
    topic: string = "/topic/appliances/getsingle";
    stompClient: any;
    subjectspost: Subjectpost= new Subjectpost();  // obj
    //dashboardComponent: DashboardComponent;
public ws: any;

  // metoda connect qe ben lidhjen me serverin e websocket 
    getSubjectPost() {
        console.log("Connect here");
        this.ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(this.ws);
        const that = this;
        that.stompClient.connect({}, function(frame:any) {
            that.stompClient.subscribe(that.topic, function(message:any) {                
                that.onMessageReceived(message);                
            });
        }, this.errorCallBack);
    }


    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error:any) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this.getSubjectPost();
        }, 5000);
    }

  
    /**
     * Send message to sever via web socket
     * @param {*} message 
     */


    resolveAfter2Seconds(x:any) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, 200);
        });
    }

    // con te dhenat ne server npm websocket
    // drg nje msg ne backend
    onSend(destination: String){
        this.getSubjectPost();
        this.resolveAfter2Seconds(20).then(() => {
            this.stompClient.send(destination, {}, "Message sent!");
        });
    
    };
    private delay(ms: number): Promise<void> {
        return new Promise<void>(resolve =>
          setTimeout(resolve, ms));
      };
    
    async getPost(): Promise<Subjectpost>{
        await this.delay(500);

        console.log("wwww: ",this.subjectspost);

        return this.subjectspost;
    }
    async getPost1(): Promise<Subjectpost>{

        console.log("wwww: ",this.subjectspost);

        return this.subjectspost;
    }
    // per save te appliances te re
    onSendSave(destination: string, comment: any) {  
        console.log("--popo ; ", comment);
        
        this.getSubjectPost();
        this.resolveAfter2Seconds(20).then(() => {
            this.stompClient.send(destination, {}, JSON.stringify(comment)); // converts to JSON string
        });

    }
  
    //therritet kur eshte marre nje msg nga serveri
    onMessageReceived(message:any) {
            this.subjectspost = (JSON.parse(message.body));   // element eshte brenda obj myappliance qe mban listen appliance(dashboard)

    }


}