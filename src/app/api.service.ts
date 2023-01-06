import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL = 'https://sql.lavro.ru/call.php'
  constructor( private  http: HttpClient) { }

  updateInfo(): Observable<any>{

    let fd = new FormData();
    fd.append('pname','update_info');
    fd.append('db','298479');
    fd.append('format','columns_compact');

    return  this.http.post(this.URL,fd)
  }
}
