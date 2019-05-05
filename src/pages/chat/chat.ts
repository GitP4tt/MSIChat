import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Socket} from "ng-socket-io";
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  get messages(): object[] {
    return this._messages;
  }

  set messages(value: object[]) {
    this._messages = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }



  appendMessage(msg: object){
    console.log(this.messages)
    this.messages.push(msg);
  }

  private _nickName: string;
  private _messages: object[] = [];
  private _message: string;

  get nickName(): string {
    return this._nickName;
  }

  set nickName(value: string) {
    this._nickName = value;
  }

  constructor(private socket: Socket, public navCtrl: NavController, public navParams: NavParams) {
    this.getMessages();
  }

  ionViewDidLoad() {
    this.nickName = this.navParams.get("nick");
    this.socket.emit('join_chat', {nick: this.nickName})
  }

  sendMessage() {
    const msg = {name: this.nickName, text: this.message};
    this.appendMessage(msg);
    this.socket.emit("message", msg);
    this.message = "";
  }

  getMessages() {
    this.socket.on("newMessage", (msg) => {
      this.appendMessage(msg);
    });
  }



}
