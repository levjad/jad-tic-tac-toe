import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SquareComponent } from './square.component';
import {SvgOComponent} from "../o.component";
import {SvgXComponent} from "../x.component";

describe('SquareComponent', () => {
  let component: SquareComponent;
  let fixture: ComponentFixture<SquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SquareComponent],
      imports:[SvgXComponent, SvgOComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SquareComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an empty button when value is undefined', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button.btn.btn-soft')).toBeTruthy();
    expect(compiled.querySelector('button.btn.btn-soft').textContent).toContain('');
  });

  it('should render an X button when value is "x"', () => {
    component.value = 'x';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button.btn.btn-soft.text-accent')).toBeTruthy();
    expect(compiled.querySelector('svg-x')).toBeTruthy();
  });

  it('should render an O button when value is "o"', () => {
    component.value = 'o';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button.btn.btn-soft.text-warning')).toBeTruthy();
    expect(compiled.querySelector('svg-o')).toBeTruthy();
  });

  it('should render an X SVG in the empty button on hover when currentPlayer is "x"', () => {
    component.currentPlayer = 'x';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('button.btn.btn-soft');
    if(button){
      button.dispatchEvent(new Event('mouseover'));
      fixture.detectChanges();
      expect(compiled.querySelector('svg-x')).toBeTruthy();
    } else {
      fail('button not found');
    }
  });

  it('should render an O SVG in the empty button on hover when currentPlayer is "o"', () => {
    component.currentPlayer = 'o';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('button.btn.btn-soft');
    if(button){
      button.dispatchEvent(new Event('mouseover'));
      fixture.detectChanges();
      expect(compiled.querySelector('svg-o')).toBeTruthy();
    } else {
      fail('button not found');
    }
  });

});
