import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employer } from './Models/Employer';
import { Jobseeker } from './Models/Jobseeker';
import { catchError, retry } from 'rxjs/operators';
import { Job } from './Models/Job';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  public Get():Observable<Employer[]>
  {
    return this.http.get<Employer[]>("http://localhost:5000/api/Employer/"+"GetAllEmployers");
  }

  public AddEmployee(employer:Employer):Observable<Employer>
  {
     return this.http.post<Employer>("http://localhost:5000/api/Employer/"+"RegisterEmployers",employer);
  }

  public GetJ():Observable<Jobseeker[]>
  {
    return this.http.get<Jobseeker[]>("http://localhost:5000/api/jobseeker/"+"GetAllJobSeekers");
  }

  public AddSeeker(seeker:Jobseeker):Observable<Jobseeker>
  {
     return this.http.post<Jobseeker>("http://localhost:5000/api/jobseeker/"+"RegisterJobSeekers",seeker);
  }

  public removej(id:number):Observable<Jobseeker>
  {
    return this.http.delete<Jobseeker>('http://localhost:5000/api/admin/deleteseeker/'+id);
  }
  
  public remove(id:number):Observable<Employer>
  {
    return this.http.delete<Employer>('http://localhost:5000/api/admin/deleteemp/'+id);
  }


}
