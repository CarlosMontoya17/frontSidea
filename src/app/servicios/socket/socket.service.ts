import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { InicioComponent } from '../../componentes/inicio/inicio.component';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  constructor() { 
    this.socket = io('https://actasalinstante.com:3030');
  }

  onNewNotify(){
    return new Observable(observer => {
      this.socket.on('notification', (data:any) => {
        observer.next(data);
      });

    });
  }
}
