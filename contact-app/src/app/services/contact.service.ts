import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private apiUrl = `${environment.apiUrl}/contacts`;

    constructor(private http: HttpClient) { }

    getContacts(): Observable<Contact[]> {
        return this.http.get<Contact[]>(this.apiUrl);
    }

    getContactById(id: number): Observable<Contact> {
        return this.http.get<Contact>(`${this.apiUrl}/${id}`);
    }

    addContact(contact: Contact): Observable<Contact> {
        return this.http.post<Contact>(this.apiUrl, contact);
    }

    updateContact(contact: Contact): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${contact.id}`, contact);
    }

    deleteContact(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
