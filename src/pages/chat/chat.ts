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

  get nickname(): string {
    return this._nickname;
  }

  set nickname(value: string) {
    this._nickname = value;
  }

  constructor(public toastCtrl: ToastController, public socket: Socket, public navCtrl: NavController, public navParams: NavParams) {
    this.subscribeToSocketEvents();
  }

  ionViewDidLoad() {
    this.nickname = this.navParams.get("nick");
    this.socket.emit("join", {nick: this.nickname})
  }

  private _nickname: string;
  private _message: string;
  private _messages: object[] = [];

  subscribeToSocketEvents() {
    this.socket.on("message", (msg) => {
      this.messages.push(msg);
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

  emitMessage() {
    const msg = {text: this.message, sender: this.nickname};
    this.socket.emit("message", msg);
    this.messages.push(msg);
    this.message = "";
  }
}
