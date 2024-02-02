import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appProfileHighlight]'
})
export class ProfileHighlightDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = 'rgba(173, 216, 230, 0.5)';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = null;
  }
}
