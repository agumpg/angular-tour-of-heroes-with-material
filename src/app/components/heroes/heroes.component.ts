import { Component, OnInit } from '@angular/core';
import { Hero } from '../../hero';
import { HEROES_DATA } from '../../mock-heroes';
import { HeroService } from '../../services/hero.service';
import { MessageService } from '../../services/message.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component( {
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
} )
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroesService: HeroService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelectHero( hero: Hero ): void {
    this.selectedHero = hero;

    this.router.navigate( ['detail', { id: this.selectedHero.id }] );


    this.messageService.add( 'HeroeComponent: Héroe seleccionado: ' + hero.name );

  }

  getHeroes(): void {
    /* this.heroes = this.heroesService.getAll(); */

    this.heroesService.getHeroes()
      .subscribe( heroes => {
        this.heroes = heroes;
      } );
  }

}
