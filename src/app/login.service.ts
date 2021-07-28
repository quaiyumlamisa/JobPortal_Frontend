import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log} from './Models/Log';
import { Employer } from './Models/Employer';
import { admin } from './Models/Admin';
import { catchError, retry } from 'rxjs/operators';
import { Jobseeker } from './Models/Jobseeker';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiURL='http://localhost:5000/api/log/';

  constructor(private http: HttpClient) { }

  public Login(employee:Log):Observable<Log>
  {
     return this.http.post<Log>(this.apiURL+"Login",employee);
  }
  
  public getUserProfile():Observable<admin[]>
  {
   return this.http.get<admin[]>( 'http://localhost:5000/api/admin/profile');
 }

  public getEmpProfile():Observable< Employer[]>
  {
   return this.http.get< Employer[]>( 'http://localhost:5000/api/empprofile/profile');
  }

  public getseekerProfile():Observable< Jobseeker[]>
  {
   return this.http.get< Jobseeker[]>( 'http://localhost:5000/api/seekerprofile/profile');
  }

  public editproseeker(id:number,formData:Jobseeker):Observable<Jobseeker>
  {
    return  this.http.put<Jobseeker>('http://localhost:5000/api/seekerprofile/editseeker/'+id,formData);
  }

  public removeseekerprofile(id:number):Observable<Jobseeker>
  {
    return this.http.delete<Jobseeker>('http://localhost:5000/api/seekerprofile/deleteseeker/'+id);
  }

  public editemp(id:number,formData:Employer):Observable<Employer>
  {
    return  this.http.put<Employer>('http://localhost:5000/api/empprofile/editemp/'+id,formData);
  }

  public removeemp(id:number):Observable<Employer>
  {
    return this.http.delete<Employer>('http://localhost:5000/api/empprofile/deleteemp/'+id);
  }
}
