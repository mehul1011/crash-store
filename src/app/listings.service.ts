import { Injectable } from '@angular/core';
import { Listings } from './types';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const httpOptionsWithAuthToken = (token: any) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    AuthToken: token,
  }),
});

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  constructor(private auth: AngularFireAuth, private http: HttpClient) {}

  getListings(): Observable<Listings[]> {
    return this.http.get<Listings[]>('/api/listings');
  }

  getListingById(id: string): Observable<Listings> {
    return this.http.get<Listings>(`/api/listing/${id}`);
  }

  addViewsToListings(id: string): Observable<Listings> {
    return this.http.post<Listings>(
      `/api/listing/${id}/add-view`,
      {},
      httpOptions
    );
  }

  getAllListingsForAUser(): Observable<Listings[]> {
    return new Observable<Listings[]>((observer) => {
      this.auth.user.subscribe((user) => {
        user &&
          user.getIdToken().then((token) => {
            if (user && token) {
              this.http
                .get<Listings[]>(
                  `/api/users/${user.uid}/listings`,
                  httpOptionsWithAuthToken(token)
                )
                .subscribe((listings) => {
                  observer.next(listings);
                });
            } else {
              observer.next([]);
            }
          });
      });
    });
  }

  deleteListing(id: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.auth.user.subscribe((user) => {
        user &&
          user.getIdToken().then((token) => {
            this.http
              .delete(`/api/my-listings/${id}`, httpOptionsWithAuthToken(token))
              .subscribe(() => observer.next());
          });
      });
    });
  }

  createListing(
    name: string,
    description: string,
    price: number
  ): Observable<Listings> {
    return new Observable<Listings>((observer) => {
      this.auth.user.subscribe((user) => {
        user &&
          user.getIdToken().then((token) => {
            this.http
              .post<Listings>(
                '/api/new-listing',
                { name, description, price },
                httpOptionsWithAuthToken(token)
              )
              .subscribe(() => observer.next());
          });
      });
    });
  }

  editListing(
    id: string,
    name: string,
    description: string,
    price: number
  ): Observable<Listings> {
    return new Observable((observer) => {
      this.auth.user.subscribe((user) => {
        user &&
          user.getIdToken().then((token) => {
            this.http
              .post<Listings>(
                `/api/edit-listing/${id}`,
                { name, description, price },
                httpOptionsWithAuthToken(token)
              )
              .subscribe(() => observer.next());
          });
      });
    });
  }
}
