import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'jad-root',
    template: `<jad-board />`,
    styles: [`
      jad-board {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }
    `],
    standalone: false
})
export class AppComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    this.setTheme('dark');
  }

  setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
