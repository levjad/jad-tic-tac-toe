import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button mat-flat-button *ngIf="!value">
      {{ value }}
      <span class="hide">{{ currentPlayer }}</span>
    </button>
    <button mat-flat-button hero color="primary" *ngIf="value == 'X'">
      {{ value }}
    </button>
    <button mat-flat-button hero color="accent" *ngIf="value == 'O'">
      {{ value }}
    </button>
  `,
  styles: [
    'button { width: 100% !important; height: 100% !important; font-size: 5em !important; }',
    '.hide { display: none }',
    'button:hover .hide { display: block; color: white}'
  ],
})
export class SquareComponent {
  @Input()
  value: string | undefined;

  @Input()
  currentPlayer: string | undefined;
}
