import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// para comprobar usuario logeado
// import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public usuario: any = {}; // para saber existe usuario logeado
  sliderConfig = {
    spaceBetween: 5,
    centeredSlide: true,
    slidesPerView: 1.6
  };

  constructor(private route: Router, public router: Router) { }

  notif() {
    this.route.navigate(['news']);
  }

  ngOnInit() {
  }

}
