import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component( {
  selector: 'app-snak-bar-custom',
  templateUrl: './snak-bar-custom.component.html',
  styleUrls: ['./snak-bar-custom.component.css']
} )
export class SnakBarCustomComponent implements OnInit {

  constructor(
    public snackBarRef: MatSnackBarRef<SnakBarCustomComponent>,
    @Inject( MAT_SNACK_BAR_DATA ) public data: any
  ) { }

  ngOnInit(): void {
  }

}
