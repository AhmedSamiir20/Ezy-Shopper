import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MdbFormsModule, MdbCheckboxModule, MdbValidationModule ],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {
  validationForm: FormGroup;
  mails: string[] =['ahmedsamiirr20@gmail.com','muhammad2372002@gmail.com'] ;

  constructor() {
    this.validationForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      subject: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required),
    });
  }

  get name(): AbstractControl {
    return this.validationForm.get('name')!;
  }

  get email(): AbstractControl {
    return this.validationForm.get('email')!;
  }

  get subject(): AbstractControl {
    return this.validationForm.get('subject')!;
  }

  get message(): AbstractControl {
    return this.validationForm.get('message')!;
  }
  }
