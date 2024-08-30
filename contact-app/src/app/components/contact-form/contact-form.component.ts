import { Component, inject } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  private contactService = inject(ContactService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  contact: Contact = { name: '', phoneNumber: '' };
  isEditMode: boolean = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.contactService.getContactById(Number(id)).subscribe((contact) => {
        this.contact = contact;
      });
    }
  }

  saveContact(): void {
    if (!this.isFormValid()) {
      return;
    }

    if (this.isEditMode) {
      this.contactService.updateContact(this.contact).subscribe(() => {
        this.router.navigate(['/contacts']);
        this.toastr.success('Contact updated successfully!');
      });
    } else {
      this.contactService.addContact(this.contact).subscribe(() => {
        this.router.navigate(['/contacts']);
        this.toastr.success('Contact added successfully!');
      });
    }
  }

  isFormValid(): boolean {
    if (!this.contact.name || !this.contact.phoneNumber) {
      this.toastr.error('Please fill in all required fields.');
      return false;
    }
    return true;
  }
}
