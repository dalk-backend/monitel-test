import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SelectionModel} from '@angular/cdk/collections';

import {MeasurementDataApi} from '../../../server-api/measurement.api';

import {isOnChanges} from '../../../common/utils/utils';
import {FormatDateTimePipe} from '../../../common/pipes/format-date-time.pipe';

@Component({
  selector: 'measurements-table',
  standalone: true,
  templateUrl: './measurements-table.component.html',
  styleUrls: ['./measurements-table.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatTooltipModule,
    FormatDateTimePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeasurementsTableComponent implements OnChanges {
  @Input() data?: MeasurementDataApi[] | null;
  @Input() selection?: SelectionModel<MeasurementDataApi>;

  @Output() editEvent: EventEmitter<MeasurementDataApi> = new EventEmitter<MeasurementDataApi>();

  dataSource: MatTableDataSource<MeasurementDataApi> = new MatTableDataSource<MeasurementDataApi>();
  displayedColumns: string[] = [
    'select', 'measurement_date', 'measurement_time', 'source', 'phase', 'voltage', 'current', 'power', 'reactive_power',
    'cos_phase'
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (isOnChanges(changes['data'])) {
      this.dataSource.data = this.data || [];
    }
  }

  isAllSelected(): boolean {
    const numSelected = this.selection?.selected.length;
    const numRows = this.dataSource?.data.length;

    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection?.clear() :
      this.dataSource?.data.forEach(row => this.selection?.select(row));
  }
}
