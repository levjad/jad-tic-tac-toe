import {Component, effect, OnInit, signal} from '@angular/core';

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
  currentTheme = signal<string>('light'); // Default theme

  constructor() {
    effect(() => {
      this.setTheme(this.currentTheme());
      localStorage.setItem('theme', this.currentTheme());
    });
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.currentTheme.set(savedTheme);
    } else {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.currentTheme.set('dark');
      }
    }
  }

  toggleTheme() {
    this.currentTheme.update((theme: any) => (theme === 'light' ? 'dark' : 'light'));
  }

  setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
