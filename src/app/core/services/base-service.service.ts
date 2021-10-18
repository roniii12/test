import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, retryWhen, flatMap, take, concat, delay, map, filter} from 'rxjs/operators';
import { interval, of, throwError } from 'rxjs';
import { formatDate } from '@angular/common';
import { environment } from '../../../environments/environment';

export abstract class baseService {

    private apiUrl: string;
    constructor(private http: HttpClient,
        apiUrl: string) {
        this.apiUrl = `${environment.baseApiUrl}${apiUrl}`
    }
    protected dateAsParam(date: Date) {
        return formatDate(date, 'yyyy-MM-dd', 'en');
    }

    /** GET vendors from the server */
    protected get<T>(endPointUrl: string, headers?: {headers: HttpHeaders}): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${endPointUrl}`, headers).pipe(
            // retryWhen(error => {
            //    return error.pipe(
            //        flatMap((err: any) => {
            //            if (err.status === 401) {
            //                return of(err.status).pipe(delay(1000));
            //            }
            //            throw err;
            //        }),
            //        take(2),
            //        catchError(this.handleError2));
            // }),
            catchError(this.handleError(endPointUrl, null)));
        //    retryWhen(errors => {
        //    return errors.pipe(map((er: any) => {
        //        if (er.status === 401) {
        //            return of(er.status).pipe(delay(1000));
        //        }
        //        return throwError(er);
        //    }) , take(3));
        // }), catchError(this.handleError(endPointUrl, null)));
            // .pipe(
            //    retryWhen(errors => {
            //        return errors.pipe(
            //            mergeMap((er: any) => {
            //                if (er.status === 401) {
            //                    return of(er.status).pipe(delay(1000));
            //                }
            //                return throwError({ message: er.error.message || 'Notification.Core.loginError' });
            //            }),
            //            take(3),
            //            concat(throwError({ message: 'Notification.Core.networkError' }))
            //        );
            //    })

                // retryWhen(error => {
                //    return error.pipe(
                //        flatMap((err: any) => {
                //            if (err.status === 401) {
                //                return of(err.status).pipe(delay(1000));
                //            }
                //            return throwError(error);
                //        }),
                //        take(1),
                //        concat(throwError(error)));
                // }),
                // catchError(this.handleError(endPointUrl, null))
            // );
    }

    protected post<T>(endPointUrl: string , entity: T, options?: {headers: HttpHeaders}): Observable<T> {
        return this.http.post<T>(`${this.apiUrl}/${endPointUrl}`, entity, options)
            .pipe(
                retryWhen(error => {
                    return error.pipe(
                        flatMap((error: any) => {
                            if (error.status === 401) {
                                return of(error.status).pipe(delay(1000));
                            }
                            return throwError(error);
                        }),
                        take(1),
                        concat(throwError(error)));
                }),
                catchError(this.handleError(endPointUrl, null))
            );
    }

    protected postReqResp<Request, Response>(endPointUrl: string, entity: Request): Observable<Response> {
        return this.http.post<Response>(`${this.apiUrl}/${endPointUrl}`, entity)
            .pipe(
                retryWhen(error => {
                    return error.pipe(
                        flatMap((error: any) => {
                            if (error.status === 401) {
                                return of(error.status).pipe(delay(1000));
                            }
                            return throwError(error);
                        }),
                        take(1),
                        concat(throwError(error)));
                }),
                catchError(this.handleError(endPointUrl, null))
            );
    }

    handleError2(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }

    handleError<T>(operation = 'operation', result = {} as T): (error: HttpErrorResponse) => Observable<T> {

        return (error: HttpErrorResponse): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            const message = (error.error instanceof ErrorEvent) ?
                error.error.message :
                `server returned code ${error.status} with body "${error.error}"`;

            // TODO: better job of transforming error for user consumption
            console.error(`${operation} failed: ${message}`);

            // Let the app keep running by returning a safe result.
           // return of(result);
            throw this.handleValidationErrors(error.error);
        };

    }

    handleValidationErrors(error: any) : any {
        let messages: string[] = [];
        messages.push("Failed:");;
        if (error.status === 400 && error.title === "One or more validation errors occurred.") {
            for (var key in error.errors) {
                if (error.errors.hasOwnProperty(key)) {
                    messages.push(error.errors[key]);
                }
            }
            return { messages: messages };
        }
        return error;
    }




    /* GET vendors whose name contains search term */
    //searchvendors(term: string): Observable<VendorModel[]> {
    //    term = term.trim();

    //    // Add safe, URL encoded search parameter if there is a search term
    //    const options = term ?
    //        { params: new HttpParams().set('name', term) } : {};

    //    return this.http.get<VendorModel[]>(this.vendorsUrl, options)
    //        .pipe(
    //            catchError(this.handleError<VendorModel[]>('searchvendors', []))
    //        );
    //}

    //////// Save methods //////////




}
