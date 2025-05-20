import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

import {MeasurementDataApi} from '../../../../server-api/measurement.api';
import {FormValidationService} from '../../../../services/form-validation.service';


@UntilDestroy()
@Component({
  selector: 'measurement-dialogs',
  standalone: true,
  templateUrl: './measurement-dialogs.component.html',
  styleUrls: ['./measurement-dialogs.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MeasurementDialogsComponent {

  dialogForm: FormGroup = this._initForm();

  constructor(
    private _fb: FormBuilder,
    private _formValidationService: FormValidationService,
    @Inject(MAT_DIALOG_DATA) public data: MeasurementDataApi
  ) {
    if (data) {
      this.dialogForm.patchValue(data);
      this.dialogForm.disable();
    } else {
      this._generateForm();
    }

    this.getControl('measurement_datetime')?.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(value => {
          if (value) {
            this.getControl('measurement_datetime')?.patchValue(new Date(value),
              {emitEvent: false, onlySelf: true});
          }
        }
      );
  }

  getControl(name: string): AbstractControl | null {
    return this.dialogForm.get(name);
  }

  getValidatorErrorMessage(field: AbstractControl | null) {
    return this._formValidationService.getValidatorErrorMessage(field);
  }

  enableForm(): void {
    /** Т.к. по заданию не все поля открываем, то открываем два поля вручную,
     * иначе можно было бы dialogForm.enable()*/
    this.getControl('measurement_datetime')?.enable();
    this.getControl('source')?.enable();
  }


  private _generateForm(): void {
    /** Заполнение формы сгенерированными значениями*/
    this._generatePhase();
    this._generateFieldValue('voltage', 1, 1.5, 2);
    this._generateFieldValue('current', 0.3, 0.5, 1);
    this._generateFieldValue('power', 2.5, 3.2, 3);
    this._generateFieldValue('reactive_power', 0.7, 0.9, 2);
    this._generateFieldValue('cos_phase', 0.6, 0.9, 2);
  }

  private _generatePhase(): void {
    /** Генерация значения для поля Фаза*/
    let chars: string = 'abc';
    let result: string = '';
    for (let i = 0; i < 3; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    result = Array.from(new Set(result.split('').sort())).join(',');
    this.getControl('phase')?.patchValue(result);
  }

  private _generateFieldValue(field: string, min: number, max: number, digits: number) {
    this.getControl(field)?.patchValue(this._getRandomArbitrary(min, max, digits));
  }

  private _getRandomArbitrary(min: number, max: number, digits: number): number {
    return +(Math.random() * (max - min) + min).toExponential(digits);
  }

  private _initForm(): FormGroup {
    return this._fb.group({
      id: [null],
      measurement_datetime: [new Date()],
      source: [null, [Validators.required]],
      phase: [{value: null, disabled: true}],
      voltage: [{value: null, disabled: true}],
      current: [{value: null, disabled: true}],
      power: [{value: null, disabled: true}],
      reactive_power: [{value: null, disabled: true}],
      cos_phase: [{value: null, disabled: true}]
    });
  }

}
