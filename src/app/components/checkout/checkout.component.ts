import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { SweatalertComponent } from '../sweatalert/sweatalert.component';
import { SweetAlert2LoaderService } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  providers: [SweatalertComponent]
})
export class CheckoutComponent {
  order = {
    name: '',
    address: '',
    paymentMethod: ''
  };

  constructor(private cartService: CartService, private sweatAlertComponent: SweatalertComponent, ) {}

  onSubmit(form: NgForm) {
    this.sweatAlertComponent.twoBtn();
  }
}