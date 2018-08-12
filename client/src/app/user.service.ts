import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Candidate } from './models/Candidate';
import { Observable } from 'rxjs';
import { Vote } from './models/Vote';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  register(body: any) {
    console.log(body)
    return this._http.post('http://localhost:3000/users/register', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  login(body: any) {
    return this._http.post('http://localhost:3000/users/login', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  user() {
    return this._http.get('http://localhost:3000/users/home', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }


  logout() {
    return this._http.get('http://localhost:3000/users/logout', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getCandidates(): Observable<Candidate[]> {
    return this._http.get<Candidate[]>('http://localhost:3000/candidates', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  addVote(body : any) {
    console.log(body)
    return this._http.post('http://localhost:3000/votes/addVote', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  getVotes(): Observable<Vote[]> {
    return this._http.get<Vote[]>('http://localhost:3000/votes', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
}
