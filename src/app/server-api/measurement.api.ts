import {Transform} from 'class-transformer';
import {dateToClass, dateToPlain} from '../common/utils/utils';

export class MeasurementDataApi {
  id: number = 0;
  // дата и время записи
  // бек хранит дату обычно в plain формате. Добавляем трансформеры для преобразования даты для фронта и бека
  @Transform(dateToPlain(), {toPlainOnly: true})
  @Transform(dateToClass(), {toClassOnly: true})
  measurement_datetime: Date | string | null = null;
  // Источник
  source: string | null = null;
  // Фаза
  phase: string | null = null;
  // Напряжение (U, кВ)
  voltage: number | null = null;
  // Ток (I, A)
  current: number | null = null;
  // Мощность (P, MBt)
  power: number | null = null;
  // Реактивная мощность (Q, Mвар)
  reactive_power: number | null = null;
  // Косинус фазового угла (cos f)
  cos_phase: number | null = null;
}

