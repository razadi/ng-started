export class RouteState {
  id: number;
  path: string;
  data: any;
  title: string;

  constructor(){
    this.id = Math.floor(Math.random() * 90000) + 10000;
  }
    
}
