import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Customer} from '../model/customer'; 

@Injectable()
export class DataService{
    private customersUrl='customer';
    private headers=new Headers({'Content-Type':'application/json'});

    constructor(private http:Http){}


     getCustomers(): Promise<Customer[]> {
    return this.http.get(this.customersUrl)
      .toPromise()
      .then(response => response.json() as Customer[])
      .catch(this.handleError);
  }
  getCustomersByLastName(lastname: string ):Promise<Customer[]>{
      const url='findbylastname/${lastname}';
      return this.http.get(url).toPromise().then(response=> response.json() as Customer) .catch(this.handleError); 
  }
  create(customer:Customer):Promise<Customer>{
      return this.http.post("postcustomer", JSON.stringify(Customer),{headers:this.headers})
      .toPromise().then(response=>response.json() as Customer).catch(this.handleError);
  }

  delete(id:number): Promise<Customer[]>{
      const url='${this.customersUrl}/${id}';
      return this.http.delete(url, {headers:this.headers}).toPromise().then(()=>null).catch(this.handleError);
  }
  private handleError(error: any):Promise<any>{
console.error('Error',error);
return Promise.reject(error.message|| error);
  }
}