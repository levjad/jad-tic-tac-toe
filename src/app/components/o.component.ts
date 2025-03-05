import { Component, input } from '@angular/core';

@Component({
  selector: 'svg-o',
  template: `
    <svg [attr.width]="width()" [attr.height]="height()" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle [attr.class]="strokeColor()" cx="50" cy="50" r="40" stroke="transparent" stroke-width="20" fill="none"/>
    </svg>
  `,
  styles: [``],
  standalone: true
})
export class SvgOComponent {
  strokeColor = input<string>('stroke-warning');
  width = input<number>(10);
  height = input<number>(10);
}
