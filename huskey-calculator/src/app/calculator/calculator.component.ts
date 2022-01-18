import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CalculationService} from "../calculation.service";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  form: FormGroup;
  tableArray:number[][] = [[1, 2, 3, 4], [5, 6, 7, 8], [1, 2, 3, 4], [5, 6, 7, 8]];

  private initForm(): FormGroup {
    return this.fb.group(
      {
        salary: [0, [Validators.required, Validators.min(0)]],
        children: [0, [Validators.required, Validators.min(0)]],
        children18: [0, [Validators.required, Validators.min(0)]],
        isMonth: [true, Validators.required],
        commuterTax: [0]
      }
    );
  }

  checkError(errors: string, name: string) : boolean {
    return !!this.form.get(name)?.errors?.[errors];
  }

  constructor(private fb:FormBuilder, private service: CalculationService) {
    this.form = this.initForm();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form.value);


    // calc
    let brutto = this.form.get('salary')?.value;
    let bruttoMonth;
    if (this.form.get('isMonth')) {
      bruttoMonth = brutto;
      brutto *= 14;
    } else {
      bruttoMonth = brutto / 14;
    }
    let netto = this.service.netto(brutto, 0, this.form.get('children')?.value, this.form.get('children18')?.value, this.form.get('isMonth')?.value);
    let nettoUrlaub = this.service.netto(brutto, 1,this.form.get('children')?.value, this.form.get('children18')?.value, this.form.get('isMonth')?.value);
    let sv = this.service.sv(brutto, 0, this.form.get('isMonth')?.value);
    let svUrlaub = this.service.sv(brutto.value, 1, this.form.get('isMonth')?.value);
    let lst = this.service.lohnsteuer(brutto, 0, this.form.get('children')?.value, this.form.get('children18')?.value, this.form.get('isMonth')?.value);
    console.log('sv:', sv, 'svUrlaub:', svUrlaub, 'lst:', lst);

    // set table
    this.tableArray[0][0] = bruttoMonth;
    this.tableArray[0][1] = bruttoMonth;
    this.tableArray[0][2] = bruttoMonth;
    this.tableArray[0][3] = brutto * 14;

    this.tableArray[1][0] = sv;
    this.tableArray[1][1] = svUrlaub;
    this.tableArray[1][2] = svUrlaub;
    this.tableArray[1][3] = sv * 12 + svUrlaub * 2;

    this.tableArray[3][0] = netto;
    this.tableArray[3][1] = nettoUrlaub;
    this.tableArray[3][2] = netto;
    this.tableArray[3][3] = netto;
  }
}
