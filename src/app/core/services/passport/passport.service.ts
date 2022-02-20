import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../tools/session.service';
import { map } from 'rxjs/operators';

const defaultUser = null;
const defaultCia = null;
const defaultMenu = null;

@Injectable({
  providedIn: 'root'
})
export class PassportService {

  user$ = new BehaviorSubject(defaultUser);
  cia$ = new BehaviorSubject(defaultCia);
  menu$ = new BehaviorSubject(defaultMenu);

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { 
    const dataUser = this.sessionService.getItem("currentUser");
    if (dataUser != null) {
        this.user$.next(dataUser);
    }
    const dataCia = this.sessionService.getItem("currentCia");
    if (dataCia != null) {
      this.cia$.next(dataCia);
    }
  }

  setUser(user: any) {
    this.sessionService.setItem("currentUser", user);
    this.user$.next(user);
  }

  setCia(cia: any) {
    this.sessionService.removeItem("currentCia");
    this.sessionService.setItem("currentCia", cia);
    this.cia$.next(cia);
  }

  setMenu(menu: any) {
    this.menu$.next(menu);
  }

  login(userName: string, password: string): Promise<IUser> {
    let data = {user: userName, pass: password};
    return this.http.post(`${environment.apiserver}Auth/login`, data).pipe(map((res: any) => {
      return res.user;
    })).toPromise();
  }
  
  logout() {
      this.sessionService.removeItem("currentUser");
      this.user$.next(defaultUser);
      this.sessionService.removeItem("currentCia");
      this.cia$.next(defaultCia);
  }

  getMenu(user: any) {
    let data = {niv: user};
    return this.http.post(`${environment.apiserver}Auth/menu`, data).pipe(map((res: any) => {
      return res.menu;
    })).toPromise();
  }

}
