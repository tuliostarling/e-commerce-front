import { Component, ViewEncapsulation, Input } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-login',
  templateUrl: './modal-login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent {
  @Input() classes: string;

  constructor(
    private modalService: NgbModal
  ) { }

  openModal(content) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

}
