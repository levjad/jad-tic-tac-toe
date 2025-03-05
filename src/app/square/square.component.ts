import { Component, Input } from '@angular/core';

@Component({
    selector: 'jad-square',
    template: `
      @if(!value) {
        <button class="btn btn-soft">
          {{ value }}
          <span class="hide">
              @if(currentPlayer == 'x') {
                <svg-x [strokeColor]="'stroke-base-100'" [width]="50" [height]="50" />
              }

              @if(currentPlayer == 'o') {
                <svg-o [strokeColor]="'stroke-base-100'" [width]="50" [height]="50" />
              }
          </span>
        </button>
      }

      @if(value == 'x') {
        <button class="btn btn-soft text-accent">
          <svg-x [width]="50" [height]="50" />
        </button>
      }

      @if(value == 'o') {
        <button class="btn btn-soft text-warning">
          <svg-o [width]="50" [height]="50" />
        </button>
      }
  `,
    styles: [
        'button { width: 100% !important; height: 100% !important; font-size: 4em !important; font-weight: bold }',
        '.hide { display: none }',
        'button:hover .hide { display: block; color: rgba(255,255,255,0.5)}'
    ],
    standalone: false
})
export class SquareComponent {
  @Input()
  value: string | undefined;

  @Input()
  currentPlayer: string | undefined;
}
