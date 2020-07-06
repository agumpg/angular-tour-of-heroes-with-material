import { Component, OnInit } from '@angular/core';
import { Hero } from '../../hero';
import { HeroService } from '../../services/hero.service';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
} )
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;
  loading: boolean = false;

  constructor(
    private heroesService: HeroService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelectHero( hero: Hero ): void {
    this.selectedHero = hero;
    this.router.navigate( ['/detail', this.selectedHero.id] );
    this.messageService.add( 'HeroeComponent: Héroe seleccionado: ' + hero.name );
  }

  getHeroes(): void {
    this.loading = !this.loading;

    this.heroesService.getHeroes()
      .subscribe( heroes => {
        this.heroes = heroes;
        this.loading = !this.loading;
      } );
  }

}
