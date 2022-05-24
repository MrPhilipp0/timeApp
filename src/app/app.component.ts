import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = "What's the time?";
  continent = "";
  city = "";
  timeZones = [
    {
      continent: 'Europe',
      city: 'Warsaw'
    },
    {
      continent: 'America',
      city: 'New York'
    },
    {
      continent: 'Asia',
      city: 'Tokyo'
    },
    {
      continent: 'Australia',
      city: 'Sydney'
    },
    {
      continent: 'Africa',
      city: 'Cairo'
    }
  ];

  setItem(continent:string, city:string):void {
    this.city = "";
    this.continent = "";
    setTimeout(() => {
      this.continent = continent;
      this.city = city;   
    },1);
  }
}
