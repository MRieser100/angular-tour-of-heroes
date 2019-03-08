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

  constructor(private heroService: HeroService) { } // shouldn't do too much, only use for wiring constructor params to properties

  ngOnInit() {  // lifecycle hook - place all initial service calls here
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes); // .subscribe(<callback>) akin to AngularJS .then(<callback>)
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero) // 
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
}
