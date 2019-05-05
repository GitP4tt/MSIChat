import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ChatPage} from "../chat/chat";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private _nickName: string;

  get nickName(): string {
    return this._nickName;
  }

  set nickName(value: string) {
    this._nickName = value;
  }

  navToChat() {
    console.log("navto chat")
    this.navCtrl.setRoot(ChatPage, {nick: this.nickName});
  }

  constructor(public navCtrl: NavController) {
  }

}
