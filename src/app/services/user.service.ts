import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { login, signUp } from '../data-type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false)
  private baseUrl = environment.URL_SERVICIOS; // Ejemplo: http://127.0.0.1:8000/api
  private users = `${this.baseUrl}/users`;

  constructor(private http: HttpClient, private router: Router) { }
  signupForm(user: signUp) {
    this.http.post(this.users, user, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }

      })

  }
  userLogin(data: login) {
    this.http.get<signUp[]>(`${this.users}?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    ).subscribe((result) => {
      if (result && result.body?.length) {
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
        this.invalidUserAuth.emit(false)
      } else {
        this.invalidUserAuth.emit(true)
      }
    })
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
