import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(
        private http: HttpClient
    ) { }

    postNewDataEmployee(data: any) {
        return this.http.post<any>("http://localhost:3001/employees/", data);
    }

    getDataEmployee() {
        return this.http.get<any>("http://localhost:3001/employees/");
    }

    getDataEmployeeByFilter(dataFilter: any) {
        return this.http.get<any>(`http://localhost:3001/employees?q=${dataFilter}`);
    }

    editDataEmployee(data: any, id: number) {
        return this.http.put<any>("http://localhost:3001/employees/" + id, data);
    }

    deleteDataEmployee(id: number) {
        return this.http.delete<any>("http://localhost:3001/employees/" + id);
    }
}