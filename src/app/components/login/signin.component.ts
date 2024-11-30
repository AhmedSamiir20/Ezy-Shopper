import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup;
  loginInfo!: User;
  token!: string;
  hide = true; // Define 'hide' property to toggle password visibility

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // createItem() {
  //   // Your create logic here
  //   this.openSnackBar('Item created successfully!', 'Close');
  // }

  // // Example: Show snackbar after an update operation
  // updateItem() {
  //   // Your update logic here
  //   this.openSnackBar('Item updated successfully!', 'Close');
  // }

  // // Example: Show snackbar after a delete operation
  // deleteItem() {
  //   // Your delete logic here
  //   this.openSnackBar('Item deleted!', 'Close');
  // }

  // // Snackbar function
  // openSnackBar(message: string, action: string) {
  //   this.snackBar.open(message, action, {
  //     duration: 3000, // Duration in milliseconds
  //     horizontalPosition: 'right', // You can change the position
  //     verticalPosition: 'top', // You can change the position
  //   });
  // }

  onLogin() {
    if (this.loginForm.valid) {
      this.loginInfo = this.loginForm.value;
      console.log('login information is ', this.loginInfo);
      this.loginService.login(this.loginInfo).subscribe(
        (res) => {
          this.toaster.success('Successfully Login', 'Logged');
          console.log('Response from service is', res);
          localStorage.setItem('token', res.token);
          console.log(localStorage.getItem('token'));
          // Navigate to home or any relevant page after successful login
          this.router.navigate(['/main-layout']);
        },
        (err) => {
          this.toaster.error('Username or Password is Incorrect', 'Error');
          this.loginForm.reset();
        }
      );
    }
  }
}
