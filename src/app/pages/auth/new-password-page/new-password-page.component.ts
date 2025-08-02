import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../reusable/footer/footer.component';
import { HeaderComponent } from '../../../reusable/header/header.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'new-reset-password',
  templateUrl: './new-password-page.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../reset-request-page/reset-request-page.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HeaderComponent, FooterComponent],
})
export class NewPasswordPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _auth: AuthService,
    private route: ActivatedRoute
  ) { }

  resetId: string | null | undefined = undefined;
  status: 'pending' | 'error' | 'success' = 'pending';
  resetForm!: FormGroup;
  passwordError: boolean = false;

  ngOnInit(): void {
    this.initForm();
    this.getInvite();
  }

  resetPassword() {
    this.passwordError = !this.passwordsMatch();
    if (this.resetId && this.resetForm.valid && this.passwordsMatch()) {
      this._auth.submitPasswordReset(this.resetId, this.resetForm.value).subscribe((res) =>
        res ? (this.status = 'success') : (this.status = 'error')
      );
    }
  }

  initForm() {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  passwordsMatch(): boolean {
    if (
      this.resetForm.controls['password'].value ===
      this.resetForm.controls['passwordConfirm'].value
    ) {
      return true;
    } else {
      this.passwordError = true;
      return false;
    }
  }

  removeQueryParams() {
    this.router.navigate(
      [],
      {
        queryParams: { token: null, email: null },
        queryParamsHandling: 'merge',
      }
    )
  }


  getInvite() {
    let token = this.route.snapshot.queryParams['token'];
    this.resetId = token
    let email = this.route.snapshot.queryParams['email'];
    this.resetForm.get("email")?.setValue(email);
    if (token && email) {
      console.log(token)
      this._auth.findPasswordReset(token, email).subscribe({
        next: (res: any) => (!res.success ? (this.status = 'error') : ''),
        error: () => (this.status = 'error'),
      });
    } else {
      this.status = 'error'
    }
  }
}
