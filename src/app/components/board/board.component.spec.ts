import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './board.component';
import { AiOpponent } from '../ai/ai-opponent';
import {SquareComponent} from "../square/square.component";
import {SvgXComponent} from "../x.component";
import {SvgOComponent} from "../o.component"; // Adjust the path as needed

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let aiOpponent: AiOpponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent, SquareComponent],
      imports: [SvgXComponent, SvgOComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    aiOpponent = component['ai']; // Access the private ai property
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize a new game on ngOnInit', () => {
    expect(component.squares).toEqual(Array(9).fill(null));
    expect(component.xIsNext).toBe(true);
    expect(component.winner()).toBeNull();
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
    expect(component.squares![0]).toBe('x');
  });

  it('should calculate winner correctly', () => {
    component.squares = ['x', 'x', 'x', '', '', '', '', '', ''];
    component.calculateWinner();
    expect(component.winner()).toBe('x');
    expect(component.isBoardDisabled).toBe(true);
  });

  it('should calculate draw correctly', () => {
    component.squares = ['x', 'o', 'x', 'o', 'x', 'o', 'o', 'x', 'o'];
    component.calculateWinner();
    expect(component.winner()).toBe('draw');
    expect(component.isBoardDisabled).toBe(true);
  });

  it('should reset game on newGame and increment scores', () => {
    component.squares = ['x', 'x', 'x', '', '', '', '', '', ''];
    component.calculateWinner();
    component.newGame();

    expect(component.squares).toEqual(Array(9).fill(null));
    expect(component.xIsNext).toBe(true);
    expect(component.winner()).toBeNull();
    expect(component.isBoardDisabled).toBe(false);
    expect(component.playerWon()).toBe(1);
  });

  it('should increment playerWon on x win and newGame', () => {
    component.squares = ['x', 'x', 'x', '', '', '', '', '', ''];
    component.calculateWinner();
    component.newGame();
    expect(component.playerWon()).toBe(1);
  });

  it('should increment cpuWon on o win and newGame', () => {
    component.squares = ['o', 'o', 'o', '', '', '', '', '', ''];
    component.calculateWinner();
    component.newGame();
    expect(component.cpuWon()).toBe(1);
  });

  it('should increment ties on draw and newGame', () => {
    component.squares = ['x', 'o', 'x', 'o', 'x', 'o', 'o', 'x', 'o'];
    component.calculateWinner();
    component.newGame();
    expect(component.ties()).toBe(1);
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

  it('should render score cards', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.card').length).toBe(3);
  });

  it('should render score values', () => {
    component.squares = ['x', 'x', 'x', '', '', '', '', '', ''];
    component.calculateWinner();
    component.newGame();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card:nth-child(1) p.font-bold')?.textContent).toBe('1');
  });
});
