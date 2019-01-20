import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../../service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private userService: UserApiService,
    private form: FormBuilder,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.formulario = this.form.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      message: [null, Validators.required],
    });
  }

  onSubmit(form) {
    this.spinnerService.show();
    this.userService.contactUs(form.value).subscribe((res) => {
      if (res.success != null) {
        this.spinnerService.hide();
        return this.toastrService.success('E-mail enviado!', 'Sucesso!');
      } else {
        this.spinnerService.hide();
        return this.toastrService.error('E-mail não enviado!', 'Erro!');
      }
    });
  }
}
