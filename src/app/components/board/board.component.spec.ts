import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './board.component';
import { Component } from '@angular/core';
import {SvgOComponent} from "../o.component";
import {SvgXComponent} from "../x.component";
import {SquareComponent} from "../square/square.component";

@Component({ selector: 'jad-square', template: '' }) class MockSquareComponent { }

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BoardComponent,
        SquareComponent,
      ],
      imports: [SvgXComponent, SvgOComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize a new game on ngOnInit', () => {
    expect(component.squares).toEqual(Array(9).fill(null));
    expect(component.xIsNext).toBe(true);
    expect(component.playerWon()).toBeNull();
    expect(component.isBoardDisabled).toBe(false);
  });

  it('should toggle player turn', () => {
    const initialPlayer = component.player;
    component.makeMove(0);
    expect(component.player).not.toBe(initialPlayer);
  });

  it('should update squares on makeMove', () => {
    component.makeMove(0);
    expect(component.squares![0]).toBe('x');
    component.makeMove(1);
    expect(component.squares![1]).toBe('o');
  });

  it('should not allow moves on occupied squares', () => {
    component.makeMove(0);
    component.makeMove(0);
    expect(component.squares![0]).toBe('x'); // Should still be 'x'
  });

  it('should calculate winner correctly', () => {
    component.squares = ['x', 'x', 'x', '', '', '', '', '', ''];
    component.calculateWinner();
    expect(component.playerWon()).toBe('x');
    expect(component.isBoardDisabled).toBe(true);
  });

  it('should reset game on newGame', () => {
    component.makeMove(0);
    component.newGame();
    expect(component.squares).toEqual(Array(9).fill(null));
    expect(component.xIsNext).toBe(true);
    expect(component.playerWon()).toBeNull();
    expect(component.isBoardDisabled).toBe(false);
  });

  it('should render the squares', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('jad-square').length).toBe(9);
  });

  it('should render the winner message when a player wins', () => {
    component.squares = ['x', 'x', 'x', '', '', '', '', '', ''];
    component.calculateWinner();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.alert')).toBeTruthy();
  });

  it('should render the correct player turn', () => {
    const compiled = fixture.nativeElement;
    const xTurn = compiled.querySelector('button.btn.btn-soft span.font-semibold.text-xs');
    expect(xTurn?.textContent).toContain('TURN');
    expect(compiled.querySelector('svg-x')).toBeTruthy();
    component.makeMove(0);
    fixture.detectChanges();
    expect(compiled.querySelector('svg-o')).toBeTruthy();
  });

});
