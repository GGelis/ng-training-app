import { Directive,ElementRef,HostListener,Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {

  constructor(private el: ElementRef) {
    this.setHeight(180);
    this.setBorder('#f5f5f5');
   }

  @Input('pkmnBorderCard') borderColor: string = '#009688';

   @HostListener('mouseenter') onMouseEnter() : void {
    this.setBorder(this.borderColor);
    }

  @HostListener('mouseleave') onMouseLeave() : void {
    this.setBorder('#f5f5f5');
  }

  setHeight(height: number) : void {
    this.el.nativeElement.style.height = `${height}px`;
  }

  setBorder(color: string) : void {
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }
}
