import { Observable } from "rxjs";
import { CRUDService } from "./crud-service.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth-service/auth.service";

@Injectable({
  providedIn: 'root'
})
export abstract class CrudServiceImpl<T> implements CRUDService<T> {

    protected urlApi = "http://localhost:8080";

    /**
     * Used to indicate to use JWT Token in HTTP Requests or not.
     * Default it to use.
     */
    // protected secure: boolean = true;

    constructor(protected httpClient: HttpClient, protected authService: AuthService, protected path: string, protected secure: boolean) {
        
        
    }

    getAll(): Observable<T[]> {

        if(this.secure === true) {

            const jwtToken = this.authService.getJwtToken();
            if(jwtToken === null) {
                try {
                    throw new Error("JwtToken is not found in localStorage.");
                } catch (error) {
                    console.error(error);
                }
            }

            let headers = new HttpHeaders({
                "Authorization": "Bearer " + jwtToken,
                "Content-Type": "application/json",
                "Accept": "application/json"
            });

            return this.httpClient.get<T[]>(this.urlApi + "/" + this.path, {headers: headers});

        }

        return this.httpClient.get<T[]>(this.urlApi + "/" + this.path);
    }

    getById(id: number): Observable<T> {
        
        if(this.secure === true) {

            const jwtToken = this.authService.getJwtToken();
            if(jwtToken === null) {
                try {
                    throw new Error("JwtToken is not found in localStorage.");
                } catch (error) {
                    console.error(error);
                }
            }

            let headers = new HttpHeaders({
                "Authorization": "Bearer " + jwtToken,
                "Content-Type": "application/json",
                "Accept": "application/json"
            });

            return this.httpClient.get<T>(this.urlApi + "/" + this.path + "/" + id, {headers: headers}); 
        }

        return this.httpClient.get<T>(this.urlApi + "/" + this.path + "/" + id); 
    }

    save(object: T): Observable<T> {
        
        if(this.secure === true) {
            
            const jwtToken = this.authService.getJwtToken();
            if(jwtToken === null) {
                try {
                    throw new Error("JwtToken is not found in localStorage.");
                } catch (error) {
                    console.error(error);
                }
            }

            let headers = new HttpHeaders({
                "Authorization": "Bearer " + jwtToken,
                "Content-Type": "application/json",
                "Accept": "application/json"
            });

            return this.httpClient.post<T>(this.urlApi + "/" + this.path, object, {headers: headers});    

        }

        return this.httpClient.post<T>(this.urlApi + "/" + this.path, object);
    }

    saveAll(objects: T[]): Observable<T[]> {
        
        if(this.secure === true) {

            const jwtToken = this.authService.getJwtToken();
            if(jwtToken === null) {
                try {
                    throw new Error("JwtToken is not found in localStorage.");
                } catch (error) {
                    console.error(error);
                }
            }

            let headers = new HttpHeaders({
                "Authorization": "Bearer " + jwtToken,
                "Content-Type": "application/json",
                "Accept": "application/json"
            });

            return this.httpClient.post<T[]>(this.urlApi + "/" + this.path + "/save-all", objects, {headers: headers});    

        }

        return this.httpClient.post<T[]>(this.urlApi + "/" + this.path + "/save-all", objects);
    }

    update(object: T): Observable<T> {
        
        if(this.secure === true) {

            const jwtToken = this.authService.getJwtToken();
            if(jwtToken === null) {
                try {
                    throw new Error("JwtToken is not found in localStorage.");
                } catch (error) {
                    console.error(error);
                }
            }

            let headers = new HttpHeaders({
                "Authorization": "Bearer " + jwtToken,
                "Content-Type": "application/json",
                "Accept": "application/json"
            });

            return this.httpClient.put<T>(this.urlApi + "/" + this.path, object, {headers: headers});        
            
        }
        
        return this.httpClient.put<T>(this.urlApi + "/" + this.path, object);
    }

    delete(id: number): Observable<T> {
        
        if(this.secure === true) {

            const jwtToken = this.authService.getJwtToken();
            if(jwtToken === null) {
                try {
                    throw new Error("JwtToken is not found in localStorage.");
                } catch (error) {
                    console.error(error);
                }
            }

            let headers = new HttpHeaders({
                "Authorization": "Bearer " + jwtToken,
                "Content-Type": "application/json",
                "Accept": "application/json"
            });

            return this.httpClient.delete<T>(this.urlApi + "/" + id, {headers: headers});    

        }

        return this.httpClient.delete<T>(this.urlApi + "/" + id);
    }
 
}