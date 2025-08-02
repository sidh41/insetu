import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class UtilService {


  constructor(
    public api: ApiService,
    public dataservice: DataService,
    public sanitizer: DomSanitizer,
    private router: Router
  ) { }

  error(message: string) {
    Swal.fire({
      icon: 'error',
      title: message,
      toast: true,
      background: "#FF0000",
      color: "$whitefff",
      iconColor: "$whitefff",
      showConfirmButton: false,
      timer: 3000,
      position: 'top-right'
    });
  }

  ShowLoading(message: string) {
    Swal.fire({
      title: message,
      allowOutsideClick: false,
    })
    Swal.showLoading()
  }

  HideLoading(message: string) {
    Swal.update({ title: message })
    Swal.hideLoading()
    Swal.close();
  }

  DeletePrompt(message: any, is_delete: string, url: string) {
    console.log(is_delete)
    return new Promise(resolve => {
      Swal.fire({
        title: this.SwitchLabelNames(is_delete, message).title,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result: any) => {
        console.log(result)
        if (result.isConfirmed) {
          const param = {
            delete_id: message.id,
            is_product: is_delete
          }
          this.api.delete_private(url).then(async (apiresult: any) => {
            console.log(apiresult);
            if (apiresult.success) {
              Swal.fire('Deleted!', `Records with ${this.SwitchLabelNames(is_delete, message).msg}`, 'success')
            }
            resolve(result.isConfirmed);
          }, async (err) => {
            console.log("Connection failed Messge");
          });
        }
      })
    });
  }

  SwitchLabelNames(value: any, message: any) {
    console.log("value ====>", value)
    console.log("message ====>", message)
    let rettwovar: any = {};
    switch (value) {
      case 'organizations':
        rettwovar.title = `Are you sure want to delete record with Organization name  ${message.organization_name ? message.organization_name : ''} ? `;
        rettwovar.msg = `${message.organization_name ? message.organization_name : ''} name has been deleted.`;
        return rettwovar;
        break;
      case 'organizationss':
        rettwovar.title = `Are you sure want to delete record with Prompt name  ${message.user_prompt ? message.user_prompt : ''} ? `;
        rettwovar.msg = `${message.user_prompt ? message.user_prompt : ''} name has been deleted.`;
        return rettwovar;
        break;
      default:
        rettwovar.title = `Are you sure want to delete record with?`;
        rettwovar.msg = `Are you sure want to delete record with?`;
        return rettwovar;
        break;
    }
  }


  success(message: string) {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }

  isNullOrUndefined(data: any) {
    console.log(typeof data)
    if ((data == null && data == undefined && data == "") || (typeof data == 'object' || data === 'undefined') || (typeof data == 'string')) {
      console.log("true me hai");
      return true;
    } else {
      console.log("false me hai  me hai");
      return false;
    }
  }

  apiErrorHandler(err: any): false | undefined {
    if (err && err.status === 401 && err.error.error) {
      this.error(err.error.error);
      this.router.navigateByUrl('/login');
      return false;
    }
    if (err && err.status === 500 && err.error.error) {
      this.error(err.error.error);
      return false;
    }
    if (err.status === -1) {
      this.error('Failed To Connect With Server');
    } else if (err.status === 401) {
      this.error('Unauthorized Request!');
      this.router.navigateByUrl('/login');
    } else if (err.status === 500) {
      if (err.status == 500 && err.error && err.error.message) {
        this.error(err.error.message);
        return false;
      }
      this.error('Somethimg Went Wrong');
    } else if (err.status === 422 && err.error.error) {
      this.error(err.error.error);
    } else {
      this.error('Something went wrong');
    }
    return false;
  }


  filter_the_yturl(myyturl: string): any {
    if (myyturl) {
      let text = "https://www.youtube.com/embed/" + myyturl;
      return this.sanitizer.bypassSecurityTrustResourceUrl(text);
    }
  }

  ResendEmailTrigger(prod_id: any) {
    console.log(prod_id)
    return new Promise(resolve => {
      Swal.fire({
        title: `Are you sure want send Email Request`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Send it!'
      }).then((result: any) => {
        console.log(result)
        if (result.isConfirmed) {
          this.api.postDataPrivate("users/resend_activation_email", prod_id).then(async (result: any) => {
            console.log(result);
            console.log(result.success);
            if (result.success) {
              Swal.fire('Success!', `Mail Sent`, 'success')
            }
          }, async (err: any) => {
            console.log("Connection failed Messge");
          });

        }
      })
    });
  }
  successWithButton(message: string, isconfirmation?: boolean) {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'ok'
    });
  }

  ErrorWithButton(message: string, isconfirmation?: boolean) {
    Swal.fire({
      icon: 'error',
      title: message,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'ok'
    });
  }

}