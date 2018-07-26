import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private http: HttpClient) { }

  hitNodeAPI(link:string):Observable<any>{    
    link = link.substring(32,43);
    console.log(link);
    let url = 'http://localhost:4000/' + link;
    return this.http.get(url,{responseType: 'text'});
  }
}
