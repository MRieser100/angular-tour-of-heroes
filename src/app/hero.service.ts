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

  getHeroes(): Observable<Hero[]> {
    // by default, http.get() returns an untyped JSON object, use <Hero[]> to set typed JSON object(Observable of Hero Arrays - will just be one Array)
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', [])) // catchError intercepts an Observable that failed
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero[]> {
    const url = `${this.heroesUrl}/${id}`;
    
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)), // tap: looks at observable values, does something with values, then passes them along
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero : Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
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
