import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({ // decorator function that specifies Angular metadata for the component
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {  
  heroes: Hero[]; // QUESTION: why is heroes Array set here instead of on the HeroService? => isn't this not DRY?

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
    this.heroService.addHero({ name } as Hero) // cast to Hero-like object
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero); // immediately remove the hero-to-delete from list, anticipating HeroService deleteHero call will succeed
    this.heroService.deleteHero(hero).subscribe();
  }
}
