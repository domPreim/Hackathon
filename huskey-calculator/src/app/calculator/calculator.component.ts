import { Component, OnInit } from '@angular/core';

import {FormControl, NgForm} from "@angular/forms";


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  /* lohnsteuerInfo: Array<number>;
  lohnsteuerInfo = [11000,18000, 31000, 60000, 90000, 1000000];//has to be double array, to check for vacation as well


  function lohnsteuer(brutto,urlaub)
  {
    var position =  0;
    for(var i = 0; i < lohnsteuerInfo;i++)
    {
      if(brutto < lohnsteuerInfo[i])
      {
        position = i;
        break;
      }
      else if(i == lohnsteuerInfo.lenght-1)
      {
        position = i+1;
      }
    }

    return brutto * lohnsteuerProzent[urlaub][position];

    /*var lohnsteuer = 0;
    if(urlaub)
    {
      if(brutto > 650 && brutto < 25000)
      {
        lohnsteuer = 0.06;
      }
      else if(brutto > 25000 && brutto < 50000)
      {
        lohnsteuer = 0.27;
      }
      else if(brutto > 50000 && brutto < 83333)
      {
        lohnsteuer = 0.3575;
      }
      else if(brutto > 83333)
      {
        lohnsteuer = 0.5;
      }
    }
    else
    {
      if(brutto > 11000 && brutto < 18000)
      {
        lohnsteuer = 0.2;
      }
      else if(brutto > 18000 && brutto < 31000)
      {
        lohnsteuer = 0.35;
      }
      else if(brutto > 31000 && brutto < 60000)
      {
        lohnsteuer = 0.42;
      }
      else if(brutto > 60000 && brutto < 90000)
      {
        lohnsteuer = 0.48;
      }
      else if(brutto > 90000 && brutto < 1000000)
      {
        lohnsteuer = 0.5;
      }
      else if(brutto > 1000000)
      {
        lohnsteuer = 0.55;
      }
    }

    return brutto * lohnsteuer;
  }
*/
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
  }
}
