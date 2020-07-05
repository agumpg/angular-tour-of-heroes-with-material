import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import { HEROES_DATA } from '../mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable( {
  providedIn: 'root'
} )
export class HeroService {

  constructor(
    private messageService: MessageService,
    private snackBar: MatSnackBar
  ) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add( 'HeroService: lectura de Héroes' );
    return of( HEROES_DATA );
  }

  getHero( id: number ): Observable<Hero> {
    this.messageService.add( `HeroService: Lectura del Héroe con id=${ id }` );
    return of( HEROES_DATA.find( hero => hero.id === id ) );
  }

  saveHero( id: number, name: string ): void {
    let heroFoundedIndex = HEROES_DATA.findIndex( hero => hero.id === id );
    HEROES_DATA[heroFoundedIndex].name = name;
    this.snackBar.open( 'Héroe Actualizado!', 'OK', { duration: 2000 } );
  }
}
