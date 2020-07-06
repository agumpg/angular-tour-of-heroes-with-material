import { Component, OnInit } from '@angular/core';
import { Hero } from '../../hero';
import { HeroService } from '../../services/hero.service';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';

@Component( {
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
} )
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];
  selectedHero: Hero;
  loading: boolean = false;

  constructor(
    private heroService: HeroService,
    private router: Router,
    private messageService: MessageService
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
    this.heroService.getHeroes()
      .subscribe( heroes => {
        this.heroes = heroes.slice( 1, 5 );
        this.loading = !this.loading;
      } );
  }

}
