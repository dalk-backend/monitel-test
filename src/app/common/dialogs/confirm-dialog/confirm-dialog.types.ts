/** Класс для передачи данных в ConfirmDialog.data
 * - message: само сообщение, например "Хотите ли вы удалить запись?"
 * - title?: заголовок для диалога, необязательное
 * - buttonTitle?: название для кнопки "подтверждения", необязательное
 * - cancelButtonTitle?: название для кнопки "отклонения", необязательное
 *
 * Если необязательных полей не будет, то просто у диалога не будет заголовка/кнопок
 */
export class ConfirmDialogData {
  constructor(public message: string = '',
              public title?: string,
              public buttonTitle?: string,
              public cancelButtonTitle?: string) {
  }
}
