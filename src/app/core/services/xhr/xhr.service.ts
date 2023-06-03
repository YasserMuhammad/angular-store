import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class XhrService {
  private serverUrl = environment.apiUrl;

  constructor(private http: HttpClient, private alertService: AlertService) {}

  get<T>(APIName: string): Observable<T> {
    return this.http.get<T>(`${this.serverUrl}${APIName}`).pipe(
      map((event) => {
        return event;
      })
    );
  }

  post<T>(APIName: string, body?: any): Observable<T> {
    return this.http
      .post<T>(`${this.serverUrl}${APIName}`, body ? body : null)
      .pipe(
        map((event: any) => {
          this.alertHandling(event);
          return event;
        })
      );
  }

  put(APIName: string, body: any): Observable<any> {
    return this.http.put(`${this.serverUrl}${APIName}`, body).pipe(
      map((event: any) => {
        this.alertHandling(event);
        return event;
      })
    );
  }

  delete(APIName: string, body?: any): Observable<any> {
    return this.http.delete(`${this.serverUrl}${APIName}`).pipe(
      map((event: any) => {
        this.alertHandling(event);
        return event;
      })
    );
  }

  private alertHandling(event: any) {
    console.log(event);

    if (event) {
      this.alertService.success('Successfully Done...');
    }
  }
}
