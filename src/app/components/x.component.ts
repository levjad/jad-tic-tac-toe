import { Component, input } from '@angular/core';

@Component({
  selector: 'svg-x',
  template: `
    <svg [attr.width]="width()" [attr.height]="height()" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <line [attr.class]="strokeColor()" x1="10" y1="10" x2="90" y2="90" stroke="black"  stroke-width="20" stroke-linecap="round"/>
      <line [attr.class]="strokeColor()" x1="90" y1="10" x2="10" y2="90" stroke="black" stroke-width="20" stroke-linecap="round"/>
    </svg>
  `,
  styles: [``],
  standalone: true
})
export class SvgXComponent {
  strokeColor = input<string>('stroke-accent');
  width = input<number>(10);
  height = input<number>(10);
}
