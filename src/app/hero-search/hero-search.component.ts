import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  // Subject: special type of Observable, which allows for multicasting to many Observables (akin to EventEmitters)
  //          -a Subject is both a source of Observable values and an Observable itself
  //          -call next() to feed values
  private searchTerms = new Subject<string>(); 

  constructor(private heroService: HeroService) { }

  // Push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    // instead of passing a new search term directly to searchHeroes() after every keystroke,
    // SAVE ON HTTP requests by chaining RxJS operators to wait 300ms between keystrokes & only send req if term differs from last Subject
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes - cancels and discards previous search observables, returning only latest
      switchMap((term: string) =>
        this.heroService.searchHeroes(term))
    );    
  }

}
