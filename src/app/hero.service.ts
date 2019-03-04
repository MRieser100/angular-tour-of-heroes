import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs'; // use of() to simulate HttpClient RxJS Observable object
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root' // Angular creates single, shared instance of service and injects into any class that asks for it
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES); // emits the array of mock heroes
  }

}
