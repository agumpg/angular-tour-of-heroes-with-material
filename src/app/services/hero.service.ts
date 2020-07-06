import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import { HEROES_DATA } from '../mock-heroes';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable( {
  providedIn: 'root'
} )
export class HeroService {

  private heroesUrl: string = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders( { 'Content-Type': 'application/json' } )
  };

  constructor(
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    /* return of( HEROES_DATA ); */
    return this.http.get<Hero[]>( this.heroesUrl )
      .pipe(
        tap( data => this.log( 'Lectura de Héroes' ) ),
        catchError( this.handleError<Hero[]>( 'getHeroes', [] ) )
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>( id: number ): Observable<Hero> {
    const url = `${ this.heroesUrl }/?id=${ id }`;
    return this.http.get<Hero[]>( url )
      .pipe(
        map( heroes => heroes[0] ), // returns a {0|1} element array
        tap( h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log( `${ outcome } hero id=${ id }` );
        } ),
        catchError( this.handleError<Hero>( `getHero id=${ id }` ) )
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero( id: number ): Observable<Hero> {
    /*  this.messageService.add( `HeroService: Lectura del Héroe con id=${ id }` );
     return of( HEROES_DATA.find( hero => hero.id === id ) ); */

    const url = `${ this.heroesUrl }/${ id }`;
    return this.http.get<Hero>( url ).pipe(
      tap( _ => this.log( `Lectura del héroe id=${ id }` ) ),
      catchError( this.handleError<Hero>( `getHero id=${ id }` ) )
    );
  }

  /*   saveHero( id: number, name: string ): void {
      let heroFoundedIndex = HEROES_DATA.findIndex( hero => hero.id === id );
      HEROES_DATA[heroFoundedIndex].name = name;
      this.snackBar.open( 'Héroe Actualizado!', 'OK', { duration: 2000 } );
    } */

  /* GET heroes whose name contains search term */
  searchHeroes( term: string ): Observable<Hero[]> {
    if ( !term.trim() ) {
      // if not search term, return empty hero array.
      return of( [] );
    }
    return this.http.get<Hero[]>( `${ this.heroesUrl }/?name=${ term }` ).pipe(
      tap( x => x.length ?
        this.log( `found heroes matching "${ term }"` ) :
        this.log( `no heroes matching "${ term }"` ) ),
      catchError( this.handleError<Hero[]>( 'searchHeroes', [] ) )
    );
  }


  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero( hero: Hero ): Observable<Hero> {
    return this.http.post<Hero>( this.heroesUrl, hero, this.httpOptions ).pipe(
      tap( ( newHero: Hero ) => this.log( `added hero w/ id=${ newHero.id }` ) ),
      catchError( this.handleError<Hero>( 'addHero' ) )
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero( hero: Hero | number ): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${ this.heroesUrl }/${ id }`;

    return this.http.delete<Hero>( url, this.httpOptions ).pipe(
      tap( _ => this.log( `deleted hero id=${ id }` ) ),
      catchError( this.handleError<Hero>( 'deleteHero' ) )
    );
  }

  /** PUT: actualización del Héroe en servidor  */
  updateHero( hero: Hero ): Observable<any> {
    return this.http.put( this.heroesUrl, hero, this.httpOptions )
      .pipe(
        tap( _ => {
          this.log( `Actualización del héroe con id=${ hero.id } y name=${ hero.name }` ),
            this.snackBar.open( 'Héroe Actualizado!', 'OK', { duration: 2000 } );
        } ),
        catchError( this.handleError<any>( 'updateHero' ) )
      );
  }



  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>( operation = 'operation', result?: T ) {
    return ( error: any ): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error( error ); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log( `${ operation } failed: ${ error.message }` );

      // Let the app keep running by returning an empty result.
      return of( result as T );
    };
  }




  /** Log a HeroService message with the MessageService */
  private log( message: string ) {
    this.messageService.add( `HeroService: ${ message }` );
  }


}
