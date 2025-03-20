import { Observable } from "rxjs";

export interface CRUDService<T> {

    getAll():Observable<T[]> ;
    getById(id: number): Observable<T>;
    save(object: T): Observable<T>;
    saveAll(objects: T[]): Observable<T[]>;
    update(object: T): Observable<T>;
    delete(id: number): Observable<T>;

}