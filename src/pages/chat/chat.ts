import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
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

  get nickName(): string {
    return this._nickName;
  }

  set nickName(value: string) {
    this._nickName = value;
  }

  appendMessage(msg: object) {
    console.log(this.messages)
    this.messages.push(msg);
  }

  // nickname
  private _nickName: string;
  // array of message objects
  private _messages: object[] = [];
  // current message
  private _message: string;

  constructor(private socket: Socket, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    // listen for messages
    this.subscribeToEvents();
  }

  ionViewDidLoad() {
    // set nickname to the one which comes from navParams
    this.nickName = this.navParams.get("nick");
    // emit join event with nick
    this.socket.emit("join", {nick: this.nickName})
  }

  // emit message on button click
  sendMessage() {
    const msg = {name: this.nickName, text: this.message};
    this.appendMessage(msg);
    this.socket.emit("message", msg);
    this.message = "";
  }

  // subscribe
  subscribeToEvents() {
    this.socket.on("newMessage", (msg) => {
      this.appendMessage(msg);
    });

    this.socket.on("userEvent", (data) => {
      const user = data.nick;
      const event = data.event;

      const text = `${user} ${event}!`;

      const toast = this.toastCtrl.create({
        message: text,
        duration: 3000,
        position: 'top',
      });

      toast.present();

    });
  }


}
