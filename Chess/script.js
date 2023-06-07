document.addEventListener("DOMContentLoaded", function() {
  // Chess board representation
  const board = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ];

  let selectedPiece = null;
  let legalMoves = [];

  // Generate the chessboard
  const chessBoard = document.getElementById('chessBoard');
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const square = document.createElement('div');
      square.className = (i + j) % 2 === 0 ? 'square white' : 'square black';
      square.addEventListener('click', () => handleSquareClick(i, j));
      chessBoard.appendChild(square);
    }
  }

  // Handle square click
  function handleSquareClick(row, col) {
    const piece = board[row][col];

    if (selectedPiece) {
      if (legalMoves.includes(`${row},${col}`)) {
        movePiece(row, col);
        selectedPiece = null;
        legalMoves = [];
        redrawBoard();
        checkmateDetection();
        return;
      }
    }

    if (piece !== ' ') {
      if ((piece === piece.toUpperCase() && player === 1) ||
          (piece === piece.toLowerCase() && player === 2)) {
        selectedPiece = { row, col };
        legalMoves = getLegalMoves(row, col);
        redrawBoard();
      }
    }
  }

  // Move the piece
  function movePiece(newRow, newCol) {
    board[newRow][newCol] = board[selectedPiece.row][selectedPiece.col];
    board[selectedPiece.row][selectedPiece.col] = ' ';
  }

  // Get legal moves for the selected piece
  function getLegalMoves(row, col) {
    // Implement your logic for calculating legal moves here
    // This example code returns all empty squares on the board
    const legalMoves = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board[i][j] === ' ') {
          legalMoves.push(`${i},${j}`);
        }
      }
    }
    return legalMoves;
  }

  // Checkmate detection
  function checkmateDetection() {
    // Implement your logic for checkmate detection here
  }

  // Redraw the chessboard
  function redrawBoard() {
    chessBoard.innerHTML = '';

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const square = document.createElement('div');
        square.className = (i + j) % 2 === 0 ? 'square white' : 'square black';
        square.addEventListener('click', () => handleSquareClick(i, j));

        if (selectedPiece && selectedPiece.row === i && selectedPiece.col === j) {
          square.classList.add('selected');
        }

        if (legalMoves.includes(`${i},${j}`)) {
          square.classList.add('highlight');
        }

        const piece = board[i][j];
        if (piece !== ' ') {
          const pieceElement = document.createElement('span');
          pieceElement.className = 'piece';
          pieceElement.textContent = piece;
          square.appendChild(pieceElement);
        }

        chessBoard.appendChild(square);
      }
    }
  }
});
