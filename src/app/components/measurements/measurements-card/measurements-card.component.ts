import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {SelectionModel} from '@angular/cdk/collections';
import {catchError, filter, forkJoin, Observable, of, switchMap, throwError} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ToastrService} from 'ngx-toastr';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';

import {DataService} from '../../../services/data.service';
import {MeasurementDataApi} from '../../../server-api/measurement.api';
import {MeasurementsTableComponent} from '../measurements-table/measurements-table.component';
import {ConfirmDialogData, ConfirmDialogService} from '../../../common/dialogs/confirm-dialog';

import {MeasurementDialogsComponent} from '../dialogs/measurement-dialogs/measurement-dialogs.component';


@UntilDestroy()
@Component({
  selector: 'measurements-card',
  templateUrl: './measurements-card.component.html',
  styleUrls: ['./measurements-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MeasurementsTableComponent,
    MatIconModule
  ]
})
export class MeasurementsCardComponent implements OnInit {
  private _dataService = inject(DataService);
  private _confirmDialogService = inject(ConfirmDialogService);
  private _toastrService = inject(ToastrService);
  private _dialog = inject(MatDialog);

  measurementList$: Observable<MeasurementDataApi[]> = of([]);
  selection: SelectionModel<MeasurementDataApi> = new SelectionModel<MeasurementDataApi>(true, []);

  ngOnInit(): void {
    this.getMeasurementList();
  }

  getMeasurementList(): void {
    this.measurementList$ = this._getMeasurementList();
  }

  createMeasurementItem(): void {
    this._openMeasurementDialog()
      .pipe(
        switchMap(data => this._dataService.createMeasurementItem(data))
      )
      .subscribe(() => this._completedOperation('Запись успешно добавлена!'));
  }

  updateMeasurementItem(item: MeasurementDataApi): void {
    this._openMeasurementDialog(item)
      .pipe(
        switchMap(data => this._dataService.updateMeasurementsItem(
          data, item.id
        ))
      ).subscribe(() => this._completedOperation('Запись успешно обновлена!'));
  }

  removeSelectedItems(): void {
    const data: ConfirmDialogData = {
      title: 'Предупреждение',
      message: 'Удалить выбранные записи?',
      buttonTitle: 'Ок',
      cancelButtonTitle: 'Отмена'
    };
    this._confirmDialogService.openConfirmDialogWithResult(data, {
      disableClose: true, width: '30%'
    })
      .pipe(
        untilDestroyed(this),
        filter(result => result),
        switchMap(() => {
          const obs$: Observable<MeasurementDataApi[]>[] =
            this.selection.selected.map(item => this._dataService.deleteMeasurementItem(item.id));

          return forkJoin(obs$);
        }),
        catchError(error => {
          this._toastrService.error(error);

          return throwError(error);
        }),
      ).subscribe(() => this._completedOperation('Выбранные записи успешно удалены'));
  }

  private _openMeasurementDialog(data?: MeasurementDataApi): Observable<MeasurementDataApi> {
    return this._dialog.open(
      MeasurementDialogsComponent, {data, disableClose: true, width: '55%'}
    ).afterClosed()
      .pipe(
        untilDestroyed(this),
        filter(result => result)
      );
  }

  private _completedOperation(message: string): void {
    this._toastrService.success(message);
    this.getMeasurementList();
    this.selection.clear();
  }

  private _getMeasurementList(): Observable<MeasurementDataApi[]> {
    return this._dataService.getMeasurementsList();
  }

}
