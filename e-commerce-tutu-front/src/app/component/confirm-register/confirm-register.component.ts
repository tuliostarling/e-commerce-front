import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserApiService } from '../../service/user/user-api.service';

@Component({
  selector: 'app-confirm-register',
  templateUrl: './confirm-register.component.html',
  styleUrls: ['./confirm-register.component.css']
})
export class ConfirmRegisterComponent implements OnInit {

  hexHash: string;

  constructor(
    private apiService: UserApiService,
    public acRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.acRoute.params
      .subscribe((params: any) => {
        if (params.hasOwnProperty('hex')) {
          this.hexHash = params.hex;
        }
      })
      this.confirmUser();
  }

  confirmUser() {
    this.apiService.confirmAccount(this.hexHash).subscribe((res) => {
      if (res) this.router.navigateByUrl('home');
    })
  }

}
