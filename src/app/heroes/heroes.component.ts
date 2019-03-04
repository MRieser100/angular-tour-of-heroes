import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({ // decorator function that specifies Angular metadata for the component
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {  
  heroes: Hero[];  
  selectedHero: Hero; // define selectedHero pointer of type Hero

  constructor(private heroService: HeroService) { } // shouldn't do too much, only use for wiring constructor params to properties

  ngOnInit() {  // lifecycle hook - place all initial service calls here
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  } 

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes); // .subscribe(<callback>) akin to AngularJS .then(<callback>)
  }

}
