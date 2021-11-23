import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Injectable({ providedIn: 'root' })
export class AlertService {

  constructor(    
    private toastrService: ToastrService
  ) { }

  
  public success( title: string, msg?: any, method?: () => void ) {
    this.viewAlert(title, 'success', msg, method);
  }

  public info( title: string, msg?: any, method?: () => void ) {
    this.viewAlert(title, 'info', msg, method);
  }

  public warning( title: string, msg?: any, method?: () => void ) {
    this.viewAlert(title, 'warning', msg, method);
  }

  public error( title: string, msg?: any, method?: () => void ) {
    this.viewAlert(title, 'error', msg, method);
  }

  public screenfull( title: string, msg?: any, method?: () => void ) {
    this.viewAlert(title, 'screenfull', msg, method);
  }

  public viewAlert( title: string, type: any, msg?: any, method?: () => void ) {

    const fakeMethod = () => { return; };

    if (typeof msg === 'function') { method = msg; }

    Swal.mixin({
      customClass: {
        container: `custom-alert-container ${type}`,
        confirmButton: 'btn'
      },
      buttonsStyling: false,
    }).fire({
      title,
      text: typeof msg === 'function' ? '' : msg,
      icon: type === 'screenfull' ? 'warning' : type,
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then(result => {
      if (result.value) {
        method ? method() : fakeMethod();
      }
    });
  }

  public question(question: string, msg?: any, methodSuccess?: () => void, methodCancel?: () => void) {

    const fakeMethod = () => { return; };

    const mixinSwal = Swal.mixin({
      customClass: {
        container: 'custom-alert-container question',
        confirmButton: 'btn',
        cancelButton: 'btn'
      },
      buttonsStyling: false,
    });

    mixinSwal.fire({
      title: question,
      text: typeof msg === 'function' ? '' : msg,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.value) {
        methodSuccess ? methodSuccess() : fakeMethod();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        methodCancel ? methodCancel() : fakeMethod();
      }
    });
  }

  
}
