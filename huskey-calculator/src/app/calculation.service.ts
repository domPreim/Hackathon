import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  //first array is always for non vacation procents. Second one is for the vacation procents
  lohnsteuerInfo = [[11000,18000, 31000, 60000, 90000, 1000000],[620,25000,50000,83333]];
  lohnsteuerProzent = [[0,20,35,42,48,50,55],[0,6,27,35.75,50]];
  svInfo = [475.86,1790,1953,2117,5550];
  svSteuerProzent = [[0,15.12,16.12,17.12,18.12,1005.66],[0,14.12,15.12,16.12,17.12,1900.32]];

  //first small pendler then big pendler
  pendlerPauschaleInfo = [20,40,60];
  pendlerPauschale = [[0,58,113,168],[31,123,214,306]];

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
  netto(brutto: number,urlaub: number,kidsu18:number,kids18: number)
  {
    return brutto - (this.lohnsteuer(brutto,urlaub,kidsu18,kids18)+this.sv(brutto,urlaub));
  }

  sv(brutto: number,urlaub: number)
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
    return isPauschal ? this.svSteuerProzent[urlaub][position] : brutto * this.svSteuerProzent[urlaub][position];
  }

  familienBonus(kidsu18: number,kids18: number)
  {
    return kidsu18*125+kids18*41.68;
  }

  lohnsteuer(brutto: number,urlaub: number,kidsu18: number,kids18: number)
  {
    var position =  0;
    for(var i = 0; i < this.lohnsteuerInfo[urlaub].length;i++)
    {
      if(brutto < this.lohnsteuerInfo[urlaub][i])
      {
        position = i;
        break;
      }
      else if(i == this.lohnsteuerInfo[urlaub].length-1)
      {
        position = i+1;
      }
    }

    return brutto * this.lohnsteuerProzent[urlaub][position] - this.familienBonus(kidsu18,kids18);
  }

}
