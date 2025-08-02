import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../reusable/footer/footer.component';
import { HeaderComponent } from '../../../reusable/header/header.component';
import { AuthService } from '../../../services/auth.service';
import { UtilService } from '../../../services/util.service';
import { RouterLink, Router, } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-reset-request',
  templateUrl: './reset-request-page.component.html',
  styleUrls: ['./reset-request-page.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, RouterLink, FooterComponent],
})
export class ResetRequestPageComponent implements OnInit {
  credentials!: FormGroup;
  otpForm!: FormGroup;
  confirmOtp!: FormGroup;
  status: 'pending' | 'submitted' = 'pending';
  authFlow: string = 'verify_email'

  constructor(private _auth: AuthService,
    public util: UtilService,
    public router: Router,
    private fb: FormBuilder) { }


  ngOnInit(): void {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required]],
    });

    this.confirmOtp = this.fb.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirm_password')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirm_password')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirm_password')?.setErrors(null);
    }
  }

  generateReset() {
    console.log(this.credentials)
    if (this.credentials.valid) {
      this.util.ShowLoading("Please Wait...");
      this._auth.requestPasswordReset(this.credentials.value.email).subscribe({
        next: (res: any) => {
          console.log(res, "res")
          this.status = 'submitted'
          this.util.HideLoading('');
          if (res.message == "OTP sent to your email") {
            // this.isOTPVerify = true;
            this.authFlow = 'verify_otp'

          }
        }, error: (error) => {
          this.util.HideLoading('');
          console.log(error)
          console.log(error.status)
          console.log("In Chatconnect provider : Error", error);

        }
      });
    } else {
      this.util.HideLoading('');
      this.util.error("Please enter email!");
      console.log('Please provide all the required values!')
    }
  }

  resetForm() {
    this.credentials.reset();
    this.status = 'pending';
  }
}
