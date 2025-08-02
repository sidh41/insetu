import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../../../reusable/footer/footer.component';
import { HeaderComponent } from '../../../reusable/header/header.component';
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';
import { UtilService } from '../../../services/util.service';
import { AuthService } from '../../../services/auth.service';
import { AppErrorComponent } from '../../../reusable/app-error/app-error.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, AppErrorComponent, HeaderComponent, RouterLink, FooterComponent, NgbCarouselModule],
    encapsulation: ViewEncapsulation.None,
})

export class LoginComponent implements OnInit {

    slides = [
        'https://cdn.pixabay.com/photo/2020/05/19/12/48/home-office-5190614_1280.jpg',
        'assets/images/default-lg-image.png',
        'assets/images/default-lg-image.png'
    ];


    Authform!: FormGroup;
    isSubmitted: boolean = false;

    error_messages = {
        'email': [
            { type: 'required', message: 'Email is required.' },
            { type: 'pattern', message: 'Enter a valid Email address.' },
        ],
        'password': [
            { type: 'required', message: 'Password  is required.' },
            { type: 'minlength', message: 'Enter minimum 8 characters.' },
        ],
    }

    constructor(
        public api: ApiService,
        public authService: AuthService,
        public router: Router,
        public util: UtilService,
        public dataservice: DataService,
        public formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.InitForm()
    }

    InitForm() {
        this.Authform = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            password: ['', [Validators.required, Validators.minLength(4)]],
        });
    }

    onSubmit(): any {
        this.Authform.markAllAsTouched();
        if (!this.Authform.valid) {
            this.util.error("Please provide all the required values!");
            console.log('Please provide all the required values!')
            return false;
        } else {

            this.util.ShowLoading("Please Wait Logging User")
            this.authService.ProceedLogin(this.Authform.value).then((result: any) => {
                this.util.HideLoading('')
                console.log(result)
                if (result.status) {
                    this.router.navigate(['/dashboard'])
                } else {
                    this.util.error(result.message)
                }
            }, async (err) => {
                console.log(err)
                this.util.HideLoading("Something Went Wrong")
                console.log("Connection failed Messge");
            })

        }
    }


    showPass() {
        let p = document.getElementById("passShow");
        if (p?.getAttribute("type") == "password") {
            p.setAttribute("type", "text");
        }
        else {
            p?.setAttribute("type", "password");
        }
    }

}

