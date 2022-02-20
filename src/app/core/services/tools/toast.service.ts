import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private message: NzMessageService
  ) { }

  addSingle(type: string, message: string): void {
    this.message.create(type, message);
  }

  success(content: any, time: number = 0) {
    let options = { nzDuration: time, nzAnimate: true };
    this.message.success(content, options);
  }

  error(content: any, time: number = 0) {
    let options = { nzDuration: time, nzAnimate: true };
    this.message.error(content, options);
  }

  info(content: any, time: number = 0) {
    let options = { nzDuration: time, nzAnimate: true };
    this.message.info(content, options);
  }

  warning(content: any, time: number = 0) {
    let options = { nzDuration: time, nzAnimate: true };
    this.message.warning(content, options);
  }

  loading(content: any, time: number = 0) {
    let options = { nzDuration: time, nzAnimate: true };
    this.message.loading(content, options);
  }

}
