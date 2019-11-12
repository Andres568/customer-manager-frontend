import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/_services/store.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor( private router: Router) { }


  ngOnInit() {
   }

   onBookNow(){
    this.router.navigate(['/customers']);
   }

}
