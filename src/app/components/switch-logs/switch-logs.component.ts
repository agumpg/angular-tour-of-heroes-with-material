import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component( {
  selector: 'app-switch-logs',
  templateUrl: './switch-logs.component.html',
  styleUrls: ['./switch-logs.component.css']
} )
export class SwitchLogsComponent implements OnInit {


  constructor( public messageService: MessageService ) { }

  ngOnInit(): void {
  }



}
