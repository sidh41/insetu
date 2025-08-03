import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-error',
  standalone: true,
  template: `
    <ng-container class="error-messages" *ngIf="shouldShowError()">
  <ng-container *ngFor="let error of errorMessages">
    <p class="error-message" *ngIf="control?.hasError(error.type)">  {{ error.message }} </p>
  </ng-container>
</ng-container>
  `,
  styles: [`
      .error-message {
      color: #dc3545;
      margin: 5px 0px;
    }  `],
  imports: [CommonModule, FormsModule,]
})

export class AppErrorComponent {

  @Input() control: AbstractControl | null = null;
  @Input() errorMessages: { type: string; message: string }[] = [];

  shouldShowError(): boolean | null {
    return this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }

  getErrorMessage(): string | null {
    if (this.control) {
      for (const error of this.errorMessages) {
        if (this.control.hasError(error.type)) {
          return error.message;
        }
      }
    }
    return null;
  }
}