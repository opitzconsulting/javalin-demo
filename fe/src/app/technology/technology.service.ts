import {Injectable} from '@angular/core';
import {Technology} from '../technology.model';
import {Tag} from '../tag.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  private baseUrl = 'http://localhost:7000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private searchSubject = new BehaviorSubject<string>('');
  currentSearch = this.searchSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) { }

  changeSearch(searchValue: string) {
    this.searchSubject.next(searchValue);
  }

  getTechnologies(): Observable<Technology[]> {
    // TODO sends the message before updateing...
    const url = `${this.baseUrl}/technologies`;
    return this.http.get<Technology[]>(url).pipe(
      // TODO tap with different log fucntion
      tap(_ => console.log('getTechnologies')),
      catchError(this.handleError<Technology[]>('getTechnologies', []))
    );
  }

  // get one Technology by Id
  getTechnology(id: number): Observable<Technology> {
    const url = `${this.baseUrl}/technologies/${id}`;
    return this.http.get<Technology>(url).pipe(
      // TODO tap with log function
      tap((newTechnology: Technology) => console.log(`get current technology ${newTechnology.id}`)),
      catchError(this.handleError<Technology>(`getTechnology id=${id}`))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteTechnology(technology: Technology | number): Observable<Technology> {
    const id = typeof technology === 'number' ? technology : technology.id;
    const url = `${this.baseUrl}/technologies/${id}`;
    return this.http.delete<Technology>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted technology id=${id}`)),
      catchError(this.handleError<Technology>('deleteTechnology'))
    );
  }

  // Push new Technology to server
  addTechnology(technology: Technology): Observable<Technology> {
    const url = `${this.baseUrl}/technologies`;
    return this.http.post<Technology>(url, technology, this.httpOptions)
      .pipe(
        // tap((newTechnology: Technology) => console.log(`add new technology=${newTechnology.id}`)), //new TEch error
        catchError(this.handleError<Technology>('addTechnology'))
      );
  }

  // edit a selected technology
  editTechnology(technology: Technology): Observable<Technology> {
    const url = `${this.baseUrl}/technologies`;
    return this.http.put(url, technology, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('editTechnology'))
      );
  }


  // TODO: create Technology Tag join relation. At the moment this is really bad
  getTags(): Observable<Tag[]> {
    const url = `${this.baseUrl}/tags`;
    return this.http.get<Tag[]>(url).pipe(
      // TODO tap with different log fucntion
      tap(_ => console.log('getTags')),
      catchError(this.handleError<Tag[]>('getTags', []))
    );
  }

  // Push new tag to server
  addTag(tag: Tag): Observable<Tag> {
    // console.log(tag);
    const url = `${this.baseUrl}/tags`;
    return this.http.post<Tag>(url, tag, this.httpOptions)
      .pipe(
        // tap((newTag: Tag) => console.log(`add new tag=${newTag.id}`)),
        catchError(this.handleError<Tag>('addTag'))
      );
  }

  // simple Test
  // getDesc() {
  //   const url = 'http://mfeval-javalin-mfeval-test.apps.ods.opitz-consulting.com/desc';
  //   return this.http.get<string>(url).pipe(
  //     tap((test: string) => console.log(`get test value from desc ${test}`))
  //   );
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // TODO: create log operation!
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
}
