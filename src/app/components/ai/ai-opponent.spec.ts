import { AiOpponent } from './ai-opponent';
import {BoardComponent} from "../board/board.component";

describe('AiOpponent', () => {
  let ai: AiOpponent;
  let board: string[];
  let component: BoardComponent;

  beforeEach(() => {
    ai = new AiOpponent('o', 'x');
    component = new BoardComponent();
  });

  it('should create an instance', () => {
    expect(ai).toBeTruthy();
  });

  // it('should return a valid random move', () => {
  //   const move = ai.getRandomMove(board);
  //   expect(move).toBeGreaterThanOrEqual(0);
  //   expect(move).toBeLessThan(9);
  // });

  it('should return null when no random move is possible', () => {
    board = ['x', 'o', 'x', 'o', 'x', 'o', 'o', 'x', 'o'];
    const move = ai.getRandomMove(board);
    expect(move).toBeNull();
  });

  it('should return the winning move if available', () => {
    board = ['o', 'o', '', '', 'x', '', 'x', '', ''];
    const move = ai.getBestMove(board, component.calculateWinner.bind(component));
    expect(move).toBe(2);
  });

  it('should block the opponent\'s winning move', () => {
    board = ['x', 'x', '', '', 'o', '', '', '', ''];
    const move = ai.getBestMove(board, component.calculateWinner.bind(component));
    expect(move).toBe(2);
  });

  it('minimax should return 0 for a draw', () => {
    board = ['x', 'o', 'x', 'x', 'o', 'o', 'o', 'x', 'x'];
    const score = ai.minimax(board, 0, true, component.calculateWinner.bind(component));
    expect(score).toBe(0);
  });

  // it('should return random move when randomness is 1', () => {
  //   const move = ai.getBestMoveWithRandomness(board, 1, component.calculateWinner.bind(component));
  //   expect(move).toBeGreaterThanOrEqual(0);
  //   expect(move).toBeLessThan(9);
  // });

  it('should return best move when randomness is 0', () => {
    board = ['o', 'o', '', '', 'x', '', 'x', '', ''];
    const move = ai.getBestMoveWithRandomness(board, 0, component.calculateWinner.bind(component));
    expect(move).toBe(2);
  });

  it('should return a mix of best and random moves with randomness between 0 and 1', () => {
    const randomness = 0.5;
    let randomCount = 0;
    let bestCount = 0;
    for(let i = 0; i < 100; i++){
      board = ['o', 'o', '', '', 'x', '', 'x', '', ''];
      const move = ai.getBestMoveWithRandomness(board, randomness, component.calculateWinner.bind(component));
      if(move === 2){
        bestCount++;
      } else {
        randomCount++;
      }
    }
    expect(randomCount).toBeGreaterThan(0);
    expect(bestCount).toBeGreaterThan(0);
  });
});
