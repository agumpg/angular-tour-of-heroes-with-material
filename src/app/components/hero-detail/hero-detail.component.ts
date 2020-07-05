import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
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
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(
        hero => { this.hero = hero; });
  }

  saveHero(): void {
    this.heroService.saveHero(this.hero.id, this.nameField.value);
    this.location.back();
  }

  goBack(): void {
    this.location.back();
  }

  // GETTERs de campos del formulario
  get idField(): AbstractControl {
    return this.formHero.get('id');
  }

  get nameField(): AbstractControl {
    return this.formHero.get('name');
  }

  // Lectura de errores de campos
  getNameFieldErrors(): string {
    if (this.nameField.hasError('maxlength')) {
      return 'Nombre demasiado largo. Introduce un nombre de hasta 20 caracteres';
    }
    return 'El nombre no puede ser vacío. Debe introducir un nombre de héroe';
  }

  // Construcción del Formulario
  private buildForm(): void {
    this.formHero = this.formBuilder.group({
      id: [{ value: this.hero.id, disabled: true }],
      name: [this.hero.name, [Validators.required, Validators.maxLength(20)]]
    });
  }

}
