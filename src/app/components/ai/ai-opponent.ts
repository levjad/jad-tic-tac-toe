export class AiOpponent {
  constructor(private playerSymbol: string, private opponentSymbol: string) {}

  getBestMove(board: string[], calculateWinner: (board: string[]) => string | null): number | null {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        const tempBoard = [...board];
        tempBoard[i] = this.playerSymbol;
        const score = this.minimax(tempBoard, 0, false, calculateWinner);
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  }

  minimax(board: string[], depth: number, isMaximizing: boolean, calculateWinner: (board: string[]) => string | null): number {
    const winner = calculateWinner(board);
    if (winner === this.playerSymbol) {
      return 1;
    } else if (winner === this.opponentSymbol) {
      return -1;
    } else if (board.every((square) => square)) {
      return 0; // Draw
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          const tempBoard = [...board];
          tempBoard[i] = this.playerSymbol;
          const score = this.minimax(tempBoard, depth + 1, false, calculateWinner);
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          const tempBoard = [...board];
          tempBoard[i] = this.opponentSymbol;
          const score = this.minimax(tempBoard, depth + 1, true, calculateWinner);
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  getRandomMove(board: string[]): number | null {
    console.log('### random move', board);
    const emptySquares = board.reduce((acc, square, index) => {
      if (!square) {
        acc.push(index);
      }
      return acc;
    }, [] as number[]);

    if (emptySquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      return emptySquares[randomIndex];
    }
    return null;
  }

  getBestMoveWithRandomness(board: string[], randomness: number, calculateWinner: (board: string[]) => string | null): number | null {
    if (Math.random() < randomness) {
      return this.getRandomMove(board);
    } else {
      return this.getBestMove(board, calculateWinner);
    }
  }
}
