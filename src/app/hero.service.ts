import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs'; // use of() to simulate HttpClient RxJS Observable object
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root' // Angular creates single, shared instance of service and injects into any class that asks for it
})
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web api - defined in form :base/:collectionName

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  /** GET array of Hero objects */
  getHeroes(): Observable<Hero[]> {
    // by default, http.get() returns an untyped JSON object, use <Hero[]> to set typed JSON object(Observable of Hero Arrays - will just be one Array)
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', [])) // catchError intercepts an Observable that failed
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id : number): Observable<Hero[]> {
    const url = `${this.heroesUrl}/${id}`;
    
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)), // tap: looks at observable values, does something with values, then passes them along
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim) {
      // if not search term, return empty Hero array
      return of([]);
    }

    return this.http.get<Hero>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  /** PUT: update the hero on the server */
  updateHero(hero : Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  /** POST: add a new hero to the server */
  addHero(hero : Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap( (newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      )
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    
    return this.http.delete<Hero>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      )
  }

  /**
   * Handle Http operation that failed
   * Let the app continue
   * NOTE: takes type parameter so it can return a safe value as the type the app expects
   * @param operation - name of the operation that failed
   * @param result    - optional value to return as the observable result
   */
  private handleError<T> ( operation = 'operation', result?: T) {
    return (error : any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T);
    }
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
