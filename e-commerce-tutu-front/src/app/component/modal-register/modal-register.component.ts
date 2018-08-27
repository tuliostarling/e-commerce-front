import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-register',
  templateUrl: './modal-register.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modal-register.component.css']
})
export class ModalRegisterComponent implements OnInit {
  @Input() classes: string;

  constructor(
    private modalService: NgbModal,
  ) { }

  openModal(content) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  ngOnInit() {
  }

}
