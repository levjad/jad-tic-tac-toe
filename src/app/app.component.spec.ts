import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {BoardComponent} from "./components/board/board.component";
import {SvgOComponent} from "./components/o.component";
import {SvgXComponent} from "./components/x.component";
import {SquareComponent} from "./components/square/square.component";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, BoardComponent, SquareComponent],
      imports: [SvgOComponent, SvgXComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set the theme to dark on ngOnInit', () => {
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should set the theme when setTheme is called', () => {
    component.setTheme('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    component.setTheme('custom-theme');
    expect(document.documentElement.getAttribute('data-theme')).toBe('custom-theme');
  });

  it('should render the jad-board component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('jad-board')).toBeTruthy();
  });
});
