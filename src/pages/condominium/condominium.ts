import { RoomDetialPage } from './../room-detial/room-detial';
import { LoaddataProvider } from './../../providers/loaddata/loaddata';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the CondominiumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-condominium',
  templateUrl: 'condominium.html',
})
export class CondominiumPage {
  rentedroom: any = [];
  roomCategory:string;
  categoryName:string;
  price:any={};

  constructor(public navCtrl: NavController, public navParams: NavParams, public porm: LoaddataProvider, public alertCtrl : AlertController ) {
  this.loaddata();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CondominiumPage');
  }

  loaddata(){
    this.porm.getCondominium().subscribe(porms=>{
      this.rentedroom=porms;
      console.log(porms);
    });
  }
  getdetail(room){
    this.navCtrl.push(RoomDetialPage,room);
  }

  getItems(ev:any) {
    let val = ev.target.value;

    if (val != 0) {
      this.porm.searchrooms(val).subscribe(rooms => {
        this.rentedroom = rooms;
      });
    }else {
      this.loaddata();
  }


}

search(){
  let alert = this.alertCtrl.create();
  alert.setTitle('เลือกราคาห้องพัก');
  alert.addInput({
    type: 'checkbox',
    label: 'น้อยกว่า 3,000',
    value: '1',
  });

  alert.addInput({
    type: 'checkbox',
    label: '3,000-4,000',
    value: '2'
  });

  alert.addInput({
    type: 'checkbox',
    label: 'มากว่า 4,000',
    value: '3'
  });
  alert.addButton('Cancel');
  alert.addButton({
    text: 'Okay',
    handler: data => {
    this.price =data;
      console.log(this.price);
      if(this.price==1){
        this.porm.loadprice_1().subscribe(data=>{
         this.rentedroom = data;
        });
      }else if(this.price==2){
        this.porm.loadprice_2().subscribe(data=>{
          this.rentedroom = data;
         });
      }else if(this.price==3){
        this.porm.loadprice_3().subscribe(data=>{
          this.rentedroom = data;
         });
      }
    }
  });
  alert.present();
}
}
