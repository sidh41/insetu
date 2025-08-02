import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  strength_categories = [];
  user_data: any = {}
  cardio_categories = [];
  user_states = [];
  categories = [];
  user_360images_data = [];
  products_data: any;

  constructor(
    private _router: Router,
    public api: ApiService,
    private _location: Location,
    @Inject(PLATFORM_ID) private platformId: Object,
    public authservice: AuthService,
  ) { }


  isNullOrUndefined(data: any) {
    // if(data ==null && data == undefined && data == ""){
    if ((data == null && data == undefined && data == "") || (typeof data == 'object' || data === 'undefined')) {
      return true;
    } else {
      return false;
    }
  }

  public ValidateArray(array: any) {
    if (typeof array != "undefined" && array != null && array.length != null && array.length > 0) {
      return true;
    } else {
      return false;
    }
  }


  setUserCartLogin(useriddetails: string) {
    console.log("setting the data here ");
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user_cart_login', useriddetails);
    }
  }

  RemoveUserCartLogin() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user_cart_login');
    }
  }

  getUserCartLogin() {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('user_cart_login')!);
    }
  }

  get getStrengthCategories() {
    if (isPlatformBrowser(this.platformId)) {
      this.strength_categories = JSON.parse(localStorage.getItem('strength_categories')!);
      return JSON.parse(localStorage.getItem('strength_categories')!);
    }
  }

  get getCategories() {
    if (isPlatformBrowser(this.platformId)) {
      this.categories = JSON.parse(localStorage.getItem('categories')!);
      console.log(this.cardio_categories)
      return JSON.parse(localStorage.getItem('categories')!);
    }
  }

  get getCardioCategories() {
    if (isPlatformBrowser(this.platformId)) {
      this.cardio_categories = JSON.parse(localStorage.getItem('cardio_categories')!);
      return JSON.parse(localStorage.getItem('cardio_categories')!);
    }
  }


  setCategData(key: string, value: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  isStringified(str: string) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return str;
    }
  }

  isValidNumber(str: string) {
    // let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let filter = /^\d+$/;
    if (filter.test(str)) {
      console.log("IS number")
      return true;
    } else {
      console.log("IS email")
      return false
    }
  }

  public ValidateObject(obj: any) {
    if (obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype) {
      return true;
    } else {
      return false;
    }
  }



  isObjectBlank(obj: any): boolean {
    if (obj === null || obj === undefined) {
      console.log("Object is Null Here --------->", obj)
      return true;
    }

    if (Object.keys(obj).length === 0) {
      return true;
    }

    for (const key in obj) {
      if (obj.hasOwnProperty(key) && (obj[key] === "" || obj[key] === null || obj[key] === undefined)) {
        console.log("Second Object Object is Null Here --------->", obj)
        return true;
      }
    }
    console.log(" All properties have non-blank values or object is empty --------->", obj)
    return false; // All properties have non-blank values or object is empty
  }

  blobToBase64(blob: Blob) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  /**
   * Convert BASE64 to BLOB
   * @param base64Image Pass Base64 image data to convert into the BLOB
   */
  public convertBase64ToBlob(base64Image: string) {
    // Split into two parts
    const parts = base64Image.split(';base64,');

    // Hold the content type
    const imageType = parts[0].split(':')[1];

    // Decode Base64 string
    const decodedData = window.atob(parts[1]);

    // Create UNIT8ARRAY of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length);

    // Insert all character code into uInt8Array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }

    // Return BLOB image after conversion
    return new Blob([uInt8Array], { type: imageType });
  }


  get isUserLoggedIn(): any {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem('user_data');
      return data ? true : false;
    }
  }

  getUserData() {
    this.user_data = JSON.parse(localStorage.getItem('user_data')!)
    if (this.user_data) {
      return this.user_data;
    } else {
      return null
    }
  }
}