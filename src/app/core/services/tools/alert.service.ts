import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private modal: NzModalService
  ) { }

  info(title: string, content: string): void {
    this.modal.info({
      nzTitle: title,
      nzContent: content,
      nzOkText: 'Ok',
      nzOnOk: () => console.log('Info OK')
    });
  }

  success(title: string, content: string): void {
    this.modal.success({
      nzTitle: title,
      nzContent: content,
      nzClosable: false,
      nzOkText: 'Ok'
    });
  }

  error(title: string, content: string): void {
    this.modal.error({
      nzTitle: title,
      nzContent: content,
      nzClosable: false,
      nzOkText: 'Ok'
    });
  }

  warning(title: string, content: string): void {
    this.modal.warning({
      nzTitle: title,
      nzContent: content,
      nzClosable: false,
      nzOkText: 'Ok'
    });
  }

  confirm(tplTitle: string, tplContent: string, cbOK, cbNo) {
    let result = this.modal.confirm({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzClosable: false,
      nzOkText: 'Confirmar',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: cbOK,
      nzCancelText: 'Cancelar',
      nzOnCancel: cbNo
    });
  }

}
