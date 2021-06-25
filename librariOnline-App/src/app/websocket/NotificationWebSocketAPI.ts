
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Notification1 } from '../model/notification/notification';
  


export class NotificationWebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8081/ws';  // endPoint created in spring consumer
    topic: string = "/topic/appliances/get";
    stompClient: any;
    notifications: Array<Notification1>=[];  // obj
    //dashboardComponent: DashboardComponent;

public ws: any;

  // metoda connect qe ben lidhjen me serverin e websocket 
    getAllNotification() {
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
            this.getAllNotification();
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
            }, 2500);
        });
    }

    // con te dhenat ne server npm websocket
    // drg nje msg ne backend
    onSend(destination: String) {
        this.getAllNotification();
        this.resolveAfter2Seconds(20).then(() => {
            this.stompClient.send(destination, {}, "Message sent!");
        });
    
    }

    // per save te appliances te re
    onSendSave(destination: String, notif: Notification1) {  
        this.getAllNotification();;
        this.resolveAfter2Seconds(20).then(() => {
            this.stompClient.send(destination, {}, JSON.stringify(notif)); // converts to JSON string
        });
    }

    //therritet kur eshte marre nje msg nga serveri
    onMessageReceived(message:any) {
       this.notifications = (JSON.parse(message.body));   // element eshte brenda obj myappliance qe mban listen appliance(dashboard)
      
    }


}