import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SweetAlert2LoaderService, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-sweatalert',
  standalone: true,
  imports: [CommonModule, SweetAlert2Module, CardComponent],
  templateUrl: './sweatalert.component.html',
  styleUrl: './sweatalert.component.css'
})
export class SweatalertComponent {
// private props
  // eslint-disable-next-line
  timerInterval: any;
  textContent!: number | undefined;

  showAlert() {
    Swal.fire({
      title: 'Ordered Successfully',
      text: 'You have ordered successfully',
      icon: 'question',
    }).then(result => {
      if (result.isConfirmed) {
        // Call the method to proceed to checkout
        console.log('Proceeding to checkout');
      }
    });
  }
  // private Method
  confirmAlert() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Your imaginary file is safe!', 'error');
      } else {
        Swal.fire('', 'Poof! Your imaginary file has been deleted!', 'success');
      }
    });
  }

  threeBtn() {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      // Check if the Save button was clicked
      }
    });
  }

  twoBtn() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire('Ordered Successfully!', 'Your order has been placed.', 'success');
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire('Cancelled', 'Your order has not been placed :)', 'error');
        }
      });
  }

  customs() {
    Swal.fire({
      title: 'Custom width, padding, color, background.',
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#fff url(/images/trees.png)',
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    });
  }

  Autoclose() {
    Swal.fire({
      title: 'Auto close alert!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        this.timerInterval = setInterval(() => {
          this.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(this.timerInterval);
      }
    });
  }

  promptAlert() {
    Swal.fire({
      text: 'Write something here:',
      input: 'text'
    }).then((result) => {
      if (result.value) {
        Swal.fire('', `You typed: ${result.value}`);
      }
    });
  }

  ajaxAlert() {
    Swal.fire({
      text: 'Submit your Github username',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/${login}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        });
      }
    });
  }
}
