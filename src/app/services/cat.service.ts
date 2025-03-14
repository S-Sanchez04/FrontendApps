import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private apiUrl = environment.apiUrl + '/cats/random';

  constructor(private http: HttpClient) {}

  getRandomCat(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }
}
