import { Directive, ElementRef, HostListener, Renderer } from '@angular/core';
import { NgControl } from '@angular/forms';

import { KeyboardEvt } from './keyboardEvt.class';

@Directive({
  selector: '[appCpf]'
})
export class CpfDirective {

  public nativeElement: HTMLInputElement;

  constructor(
    public element: ElementRef,
    private control: NgControl
  ) {
    this.nativeElement = this.element.nativeElement;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    KeyboardEvt.keyDonw(event);
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(e: Event) {
    let v = this.nativeElement.value;
    v = this.aplicaMascara(v);

    this.nativeElement.value = v;
  }

  @HostListener('paste', ['$event'])
  onPaste(e: any) {
    const base = this.nativeElement.value;
    const maxLength = this.nativeElement.maxLength;

    let text = KeyboardEvt.onPaste(e, base);

    if (text) {
      text = this.aplicaMascara(text);
      text = text.substr(0, maxLength);

      this.nativeElement.value = text;
      this.control.control.setValue(this.nativeElement.value);
    }
  }

  private aplicaMascara(v: string) {
    v = v.replace(/\D/g, '');

    if (v.length <= 11) {
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    return v;
  }
}
