import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component( {
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
} )
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;
  formHero: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getHero();
    this.buildForm();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get( 'id' );
    this.heroService.getHero( id )
      .subscribe(
        hero => { this.hero = hero; } );
  }

  getDisabledValue(): boolean {
    return true;
  }

  private buildForm(): void {
    this.formHero = this.formBuilder.group( {
      id: [{ value: this.hero.id, disabled: true }],
      name: [this.hero.name, Validators.required]
    } );

  }

}
