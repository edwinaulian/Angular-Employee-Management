import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    baseUrl = 'http://localhost:3001/employees/';
    baseUrlUsers = 'http://localhost:3001/users/';

    constructor(
        private http: HttpClient
    ) { }

    postNewDataEmployee(data: any) {
        return this.http.post<any>(this.baseUrl, data);
    }

    getDataEmployee() {
        return this.http.get<any>(this.baseUrl);
    }

    getDataEmployeeByFilter(dataFilter: any) {
        return this.http.get<any>(`http://localhost:3001/employees?q=${dataFilter}`);
    }

    editDataEmployee(data: any, id: number) {
        return this.http.put<any>(this.baseUrl + id, data);
    }

    deleteDataEmployee(id: number) {
        return this.http.delete<any>(this.baseUrl + id);
    }

    postDataUser(data: any) {
        return this.http.post<any>(this.baseUrlUsers, data);
    }
}