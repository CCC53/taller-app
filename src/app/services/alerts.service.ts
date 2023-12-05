import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AssignmentsModalComponent } from '../shared/assignments-modal/assignments-modal.component';
import { AssignmentsModalData } from '../types/assignments';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private matDialog: MatDialog) { }

  showLoading() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
  }

  showSuccessAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Registro guardado correctamente',
      showConfirmButton: true,
      allowOutsideClick: false,
    })
  }

  hideAlert() {
    Swal.close();
  }

  showErrorAlert(error: string) {
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: error,
      allowOutsideClick: false
    })
  }

  openModal(data: AssignmentsModalData): MatDialogRef<AssignmentsModalComponent> {
    return this.matDialog.open(AssignmentsModalComponent, {
      data: data,
      disableClose: true,
      minWidth: '800px'
    })
  }

  showSucessCreate(router: Router, activatedRoute: ActivatedRoute, id: string) {
    Swal.fire({
      icon: 'success',
      title: 'Registro guardado correctamente',
      showConfirmButton: true,
      allowOutsideClick: false
    }).then(res => {
      if (res.isConfirmed) {
        router.navigate(["..", id],  { relativeTo: activatedRoute })
      }
    })
  }
}
