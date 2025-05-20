import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {dateToString} from '../common/utils/utils';


@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  /** Сервис для обработки Validators FormGroup*/

  getValidatorErrorMessage(field: AbstractControl | null) {
    const config = {
      required: 'Обязательное поле',
      email: 'Поле должно содержать email',
      maxLength: '',
      minLength: '',
      matDatepickerMin: '',
      matDatepickerMax: '',
      min: '',
      max: '',
      urlPattern: 'Невалидный url',
      datePattern: 'Неверный формат даты',
      pattern: 'Неверный формат',
    };

    if (field?.hasError('required')) {
      return config.required;
    } else if (field?.hasError('email')) {
      return config.email;
    } else if (field?.hasError('maxlength')) {
      config.maxLength = `Максимальное количество символов - ${field?.errors?.['maxlength'].requiredLength}`;

      return config.maxLength;
    } else if (field?.hasError('minlength')) {
      config.minLength = `Минимальное количество символов - ${field?.errors?.['minlength'].requiredLength}`;

      return config.minLength;
    } else if (field?.hasError('matDatepickerMin')) {
      const minDate: string = dateToString(field?.errors?.['matDatepickerMin'].min, 'dd.MM.yyyy');
      config.matDatepickerMin = `Минимальное значение - ${minDate}`;

      return config.matDatepickerMin;
    } else if (field?.hasError('matDatepickerMax')) {
      const maxDate: string = dateToString(field?.errors?.['matDatepickerMax'].max, 'dd.MM.yyyy');
      config.matDatepickerMax = `Максимальное значение - ${maxDate}`;

      return config.matDatepickerMax;
    } else if (field?.hasError('min')) {
      config.min = `Минимальное значение - ${field?.errors?.['min'].min}`;

      return config.min;
    } else if (field?.hasError('max')) {
      config.min = `Максимальное значение - ${field?.errors?.['max'].max}`;

      return config.min;
    } else if (field?.hasError('pattern')) {
      return config.pattern;
    } else if (field?.hasError('urlPattern')) {
      return config.urlPattern;
    } else if (field?.hasError('datePattern')) {
      return config.datePattern;
    } else if (field?.hasError('dateYearPattern')) {
      return config.datePattern;
    }

    return '';

  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}

