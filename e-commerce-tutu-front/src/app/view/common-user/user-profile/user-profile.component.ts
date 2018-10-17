import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserApiService } from '../../../service';
import { UserCreateModel } from '../../../model/user/userCreate';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  formulario: FormGroup;
  id: number;
  pass: string;
  name: string;
  email: string;

  update = false;

  constructor(
    public apiService: UserApiService,
    private form: FormBuilder,
    public router: Router,
    private acRoute: ActivatedRoute
  ) { }

  public rowsUser: UserCreateModel;

  ngOnInit() {
    this.id = parseInt(this.acRoute.snapshot.paramMap.get('id'), 10);

    this.apiService.getListOne(this.id).subscribe((data) => {
      this.rowsUser = data;
      this.name = this.rowsUser[0].name;
      this.email = this.rowsUser[0].email;
  });

    this.formulario = this.form.group({
      id: [null],
      name: [null, Validators.required],
      email: [null],
    });
  }

  onSubmit(form) {
    this.attForm();
    this.rowsUser = form.value;

    this.apiService.update(this.rowsUser).subscribe((res) => {
      if (res === null) { return alert('Erro ao cadastrar'); }

      this.update = false;
    });

  }

  attForm() {
    this.formulario.patchValue({
      id: this.id,
      email: this.email,
    });
  }

  clickUpdate() {
    this.update = !this.update;
  }
}
