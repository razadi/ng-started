import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { IUser } from '../../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from '../tools/toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiServe = `${environment.apiserver}User`;
  users: IUser[] = [];
  headers = new HttpHeaders().set('content-type', 'application/json');
  options = {headers: this.headers};

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) { }
}
