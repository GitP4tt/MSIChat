import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ChatPage} from "../chat/chat";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // nickname property
  private _nickName: string;

  get nickName(): string {
    return this._nickName;
  }
  set nickName(value: string) {
    this._nickName = value;
  }

  // navTo to chat page
  navToChat() {
    this.navCtrl.setRoot(ChatPage, {nick: this.nickName});
  }

  constructor(public navCtrl: NavController) {
  }

}
