import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  //first array is always for non vacation procents. Second one is for the vacation procents
  lohnsteuerInfo = [[11000,18000, 31000, 60000, 90000, 1000000],[620,25000,50000,83333]];
  lohnsteuerProzent = [[0,0.20,0.35,0.42,0.48,0.50,0.55],[0,0.6,0.27,0.3575,0.50]];
  svInfo = [6662.04,25060,27342,29638,77700];
  svSteuerProzent = [[0,0.1512,0.1612,0.1712,0.1812,1005.66],[0,0.1412,0.1512,0.1612,0.1712,1900.32]];

  //first small pendler then big pendler
  pendlerPauschaleInfo = [20,40,60];
  pendlerPauschale = [[0,696,1356,2016],[372,1476,2568,3672]];

  pendler(km: number,isSmall: number)
  {
    var position =  0;
    for(var i = 0; i < this.pendlerPauschaleInfo.length;i++)
    {
      if(km < this.pendlerPauschaleInfo[i])
      {
        position = i;
        break;
      }
      else if(i == this.pendlerPauschaleInfo.length-1)
      {
        position = i+1;
      }
    }

    return this.pendlerPauschale[isSmall][position];
  }

  //returns NET salary.
  netto(brutto: number,urlaub: number,kidsu18:number,kids18: number,monatlich: boolean)
  {
    return monatlich ? (brutto/14) - (this.lohnsteuer(brutto,urlaub,kidsu18,kids18,monatlich)+this.sv(brutto,urlaub,monatlich)) 
    :  brutto - (this.lohnsteuer(brutto,urlaub,kidsu18,kids18,monatlich)+this.sv(brutto,urlaub,monatlich));
  }

  sv(brutto: number,urlaub: number,monatlich: boolean)
  {
    var position =  0;
    var isPauschal = false;
    for(var i = 0; i < this.svInfo.length;i++)
    {
      if(brutto < this.svInfo[i])
      {
        position = i;
        break;
      }
      else if(i == this.svInfo.length-1)
      {
        position = i+1;
        isPauschal = true;
      }
    }

    if(isPauschal)
    {
      return monatlich ? this.svSteuerProzent[urlaub][position] : this.svSteuerProzent[urlaub][position] * 14;
    }
    else
    {
      return monatlich ? (brutto/14) * this.svSteuerProzent[urlaub][position] : brutto * this.svSteuerProzent[urlaub][position];
    }
  }

  familienBonus(kidsu18: number,kids18: number,monatlich: boolean)
  {
    return monatlich ? kidsu18*125+kids18*41.68 : kidsu18*1500 + kids18*500.16;
  }

  lohnsteuer(brutto: number,urlaub: number,kidsu18: number,kids18: number, monatlich: boolean)
  {

    /*console.log("Brutto " + brutto);
    console.log("Urlaub "+urlaub);
    console.log("Monatlich: " +monatlich);*/
    var position =  0;
    for(var i = 0; i < this.lohnsteuerInfo[urlaub].length;i++)
    {
      /*console.log("I: " + i);
      console.log("LohnsteuerInfo: " + this.lohnsteuerInfo[urlaub][i]);*/
      if(brutto < this.lohnsteuerInfo[urlaub][i])
      {
        //console.log("Position: " + position);
        position = i;
        break;
      }
      else if(i == this.lohnsteuerInfo[urlaub].length-1)
      {
        position = i+1;
      }
    }

    return this.lohnsteuerBerechnen(brutto,urlaub,position,monatlich) - this.familienBonus(kidsu18,kids18,monatlich);
  }


  lohnsteuerBerechnen(brutto:number,urlaub:number,position: number,monatlich: boolean)
  {
    let summe = 0;
    let temp = 0;
    for(let i = 0; i < position;i++)
    {
      if(monatlich)
      {
        summe += ((this.lohnsteuerInfo[urlaub][i]/14)-temp) * this.lohnsteuerProzent[urlaub][i];
        temp = this.lohnsteuerInfo[urlaub][i]/14;
      }
      else
      {
        summe += (this.lohnsteuerInfo[urlaub][i]-temp) * this.lohnsteuerProzent[urlaub][i];
        temp = this.lohnsteuerInfo[urlaub][i];
      }
      
    }

    console.log("Summe AFTER: " + summe);

    if(monatlich)
    {
      summe += (brutto/14-temp) * this.lohnsteuerProzent[urlaub][position];
    }
    else
    {
      summe += (brutto-temp) * this.lohnsteuerProzent[urlaub][position];
    }

    return summe;
  }
}
