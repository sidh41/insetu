import { CSP_NONCE, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.apiurl;
  imageUrl = environment.imageUrl;
  token: string = ''

  constructor(private http: HttpClient,
    private _authService: AuthService) {

    this._authService.authenticated$.subscribe((authValue: any) => {
      if (authValue.auth) {
        this.token = JSON.parse(this._authService.GetToken()).access_token;
      }
    });

  }

  public post_temp(url: string, body: any, temp: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${temp}`)
      };
      const param = this.JSON_to_URLEncoded(body);
      this.http.post(this.baseUrl + url, param, header).subscribe({
        next: (res) => {
          resolve(res)
        }, error: (err) => {
          reject(err);
          console.log("In Chatconnect provider : Error", err);
        }
      });
    });
  }

  postData(credentials: any, type: string) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + type, JSON.stringify(credentials), header).subscribe({
        next: (res) => {
          resolve(res)
        }, error: (err) => {
          reject(err);
          console.log("In Chatconnect provider : Error", err);
        }
      });
    });
  }

  public uploadFormdata(formData: FormData, url: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header = {
        headers: new HttpHeaders()
          // .set('Content-Type', 'multipart/form-data')
          .set('Authorization', `Bearer ${this.token}`)
      };
      this.http.post(this.baseUrl + url, formData, header).subscribe({
        next: (res) => {
          resolve(res)
        }, error: (err) => {
          reject(err);
          console.log("In Chatconnect provider : Error", err);
        }
      });
    });
  }

  public get_public(url: string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + url).subscribe({
        next: (res) => {
          resolve(res)
        }, error: (err) => {
          reject(err);
          console.log("In Chatconnect provider : Error", err);
        }
      });
    });
  }

  public insta_full_public(url: string) {
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe({
        next: (res) => {
          resolve(res)
        }, error: (err) => {
          reject(err);
          console.log("In Chatconnect provider : Error", err);
        }
      });
    });
  }

  public get_private(url: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${this.token}`)
      };
      this.http.get(this.baseUrl + url, header).subscribe({
        next: (res) => {
          resolve(res)
        }, error: (err) => {
          reject(err);
          console.log("In Chatconnect provider : Error", err);
          this.error(err.error.message, "Token Expired Please Refresh")
        }
      });
    });
  }

  public put_private(url: string, params: any): Promise<any> {
    console.log("url ====>", url)
    return new Promise<any>((resolve, reject) => {
      const header = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${this.token}`)
      };
      this.http.put(this.baseUrl + url, params, header).subscribe({
        next: (res) => {
          resolve(res)
        }, error: (err) => {
          reject(err);
          console.log("In Chatconnect provider : Error", err);
        }
      });
    });
  }

  public delete_private(url: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${this.token}`)
      };
      this.http.delete(this.baseUrl + url, header).subscribe({
        next: (res) => {
          resolve(res)
        }, error: (err) => {
          reject(err);
          console.log("In Chatconnect provider : Error", err);
        }
      });
    });
  }


  public post_private(url: string, body: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const header = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', `Bearer ${this.token}`)
      };
      const param = this.JSON_to_URLEncoded(body);
      console.log(param);
      this.http.post(this.baseUrl + url, param, header).subscribe({
        next: (res) => {
          resolve(res)
        }, error: (err) => {
          reject(err);
          console.log("In Chatconnect provider : Error", err);
        }
      });
    });
  }

  postDataPrivate(url: string, data: any) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.token}`)
    };
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + url, data, header).subscribe({
        next: (res) => resolve(res),
        error: (err) => {
          console.error("In Chatconnect provider : Error", err);
          reject(err);
        }
      });
    });
  }


  JSON_to_URLEncoded(element: any, key?: any, list?: any) {
    let new_list = list || [];
    if (typeof element == "object") {
      for (let idx in element) {
        this.JSON_to_URLEncoded(
          element[idx],
          key ? key + "[" + idx + "]" : idx,
          new_list
        );
      }
    } else {
      new_list.push(key + "=" + encodeURIComponent(element));
    }
    return new_list.join("&");
  }


  error(title: string, message: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      titleText: message,
      toast: true,
      background: "#FF0000",
      color: "$whitefff",
      iconColor: "$whitefff",
      showConfirmButton: false,
      timer: 3000,
      position: 'top-right'
    });
  }
}
