import {Injectable} from '@angular/core';
import {map, Observable, of, throwError} from 'rxjs';
import {instanceToPlain, plainToInstance} from 'class-transformer';

import {MeasurementDataApi} from '../server-api/measurement.api';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Хранилище данных
  private _dataStore: MeasurementDataApi[] = [
    {
      id: 1,
      measurement_datetime: '2022-03-02 17:43:51',
      source: 'Регистратор',
      phase: 'ab',
      voltage: 1.1,
      current: 0.4,
      power: 3.343,
      reactive_power: 0.76,
      cos_phase: 0.65
    }, {
      id: 2,
      measurement_datetime: '2022-03-02 17:43:51',
      source: 'АСКУЭ',
      phase: 'c',
      voltage: 1.2,
      current: 0.5,
      power: 3.143,
      reactive_power: 0.78,
      cos_phase: 0.67
    }, {
      id: 3,
      measurement_datetime: '2022-03-02 17:43:51',
      source: 'АСКУЭ',
      phase: 'c',
      voltage: 1.2,
      current: 0.5,
      power: 3.143,
      reactive_power: 0.78,
      cos_phase: 0.67
    }, {
      id: 4,
      measurement_datetime: '2022-06-12 10:28:02',
      source: 'SCADA',
      phase: 'b',
      voltage: 1,
      current: 0.6,
      power: 2.756,
      reactive_power: 0.9,
      cos_phase: 0.83
    }, {
      id: 5,
      measurement_datetime: '2022-07-29 15:08:44',
      source: 'Оператор',
      phase: 'a',
      voltage: 1,
      current: 0.5,
      power: 3,
      reactive_power: 0.7,
      cos_phase: 0.67
    }, {
      id: 6,
      measurement_datetime: '2022-07-30 10:08:44',
      source: 'Оператор',
      phase: null,
      voltage: null,
      current: null,
      power: null,
      reactive_power: null,
      cos_phase: null
    },
    {
      id: 7,
      measurement_datetime: '2022-07-30 10:15:23',
      source: 'Оператор',
      phase: null,
      voltage: null,
      current: null,
      power: null,
      reactive_power: null,
      cos_phase: null
    },
  ];

  public createMeasurementItem(data: MeasurementDataApi): Observable<MeasurementDataApi[]> {
    /** Создание записи */
    data.id = Math.max(...this._dataStore.filter(item => !!item.id).map(item => item.id)) + 1;
    this._dataStore.push(instanceToPlain(data) as MeasurementDataApi);

    return this.responseHandler$;
  }

  public getMeasurementsList(): Observable<MeasurementDataApi[]> {
    /** Получение массива записей. */
    return this.responseHandler$;
  }

  public updateMeasurementsItem(data: MeasurementDataApi, id: number): Observable<MeasurementDataApi[]> {
    /** Обновление записи. */
    const index = this._dataStore.findIndex(item => item.id === id);
    if (index < 0) {
      return throwError(() => new Error('Item is not found!'));
    }
    console.log(data);
    this._dataStore.splice(index, 1, instanceToPlain(data) as MeasurementDataApi);

    return this.responseHandler$;
  }

  public deleteMeasurementItem(id: number): Observable<MeasurementDataApi[]> {
    /** Удаление записи*/
    const index = this._dataStore.findIndex(item => item.id === id);
    if (index < 0) {
      return throwError(() => new Error('Item is not found!'));
    }

    this._dataStore.splice(index, 1);

    return this.responseHandler$;
  }


  private get responseHandler$(): Observable<MeasurementDataApi[]> {
    /** Служебный геттер чтобы не дублировать код*/

    return of(this._dataStore).pipe(
      map(response => plainToInstance(MeasurementDataApi, response))
    );
  }

}
