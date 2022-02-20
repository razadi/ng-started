import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteState } from '../../models/route-state.model';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(
    private router: Router
  ) { }

  getCurrent(): RouteState {
    let routeStates = this.getFromStorage();
    return routeStates[routeStates.length - 1];
  }

  getAll(): RouteState[] {
    let routeStates = this.getFromStorage();
    return routeStates;
  }

  add(title: string, path: string, data: any, isParent: boolean) {
    if (isParent) {
        this.removeAll();
    }

    let routeStates = this.getFromStorage();

    let routeState = new RouteState();
    routeState.title = title;
    routeState.path = path;
    routeState.data = data;

    routeStates.push(routeState);
    this.saveToStorage(routeStates);
    this.navigate(routeState.path);
  }

  loadPrevious() {
    let routeStates = this.getFromStorage();
    routeStates.pop();
    this.saveToStorage(routeStates);
    let currentViewState = this.getCurrent();
    this.navigate(currentViewState.path);
  }

  loadById(id: number) {
    let result = [];
    let isFound = false;
    let routeStates = this.getFromStorage();
    routeStates.forEach(route => {
        if (isFound) {
            return;
        }
        result.push(route);
        if (route.id === id) {
            isFound = true;
        }
    });
    routeStates = result;
    this.saveToStorage(routeStates);
    let currentViewState = this.getCurrent();
    this.navigate(currentViewState.path);
  }

  removeAll() {
    this.removeFromStorage();
  }
  
  private saveToStorage(routeStates: any) {
      localStorage.setItem("routeState", JSON.stringify(routeStates));
  }
  
  private getFromStorage() {
      let routeStates = JSON.parse(localStorage.getItem("routeState"));
      return (routeStates === undefined || routeStates === null) ? [] : routeStates;
  }
  
  private removeFromStorage() {
      localStorage.removeItem("routeState");
  }
  
  private navigate(path: string) {
      this.router.navigate([path]);
  }

}
