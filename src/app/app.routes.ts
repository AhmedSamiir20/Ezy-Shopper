import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SigninComponent } from './components/login/signin.component';
import { SignupComponent } from './components/register/signup.component';
import { CategoryComponent } from './components/category/category.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';

export const routes: Routes = [
    { path: '', redirectTo:'/signin',pathMatch:'full'},
    { path: 'main-layout', component: MainLayoutComponent, children: [
      { path: '', redirectTo:'/main-layout/home',pathMatch:'full'},
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'categories/:category', component: CategoryComponent },
      { path: 'navbar', component: NavbarComponent },
      { path: 'aboutus', component: AboutusComponent}
    ]},
    { path: 'contactus', component: ContactusComponent},
    { path: 'signin', component: SigninComponent },
    { path: 'register', component: SignupComponent },
  ];