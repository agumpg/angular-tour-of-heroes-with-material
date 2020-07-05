import { Injectable } from '@angular/core';

@Injectable( {
  providedIn: 'root'
} )
export class MessageService {

  messages: string[] = [];
  visibled: boolean = true;

  constructor() { }

  add( message: string ): void {
    this.messages.push( message );
  }

  clear(): void {
    this.messages = [];
  }

  changeVisibled(): void {
    this.visibled = !this.visibled;
  }

}
