import "./App.css";

interface square {
  row: number;
  col: number;
}

const findAllMoves = (selectedRow: number, selectedCol: number) => {
  let row: number;
  let col: number;
  let moves: square[] = [];

  row = selectedRow - 2;
  col = selectedCol - 1;
  moves.push({ row, col });

  row = selectedRow - 2;
  col = selectedCol + 1;
  moves.push({ row, col });

  row = selectedRow - 1;
  col = selectedCol + 2;
  moves.push({ row, col });

  row = selectedRow + 1;
  col = selectedCol + 2;
  moves.push({ row, col });

  row = selectedRow + 2;
  col = selectedCol + 1;
  moves.push({ row, col });

  row = selectedRow + 2;
  col = selectedCol - 1;
  moves.push({ row, col });

  row = selectedRow - 1;
  col = selectedCol - 2;
  moves.push({ row, col });

  row = selectedRow + 1;
  col = selectedCol - 2;
  moves.push({ row, col });

  return moves;
};

const highlightFeasibleMoves = (
  maxRows: number,
  maxCols: number,
  moves: square[]
) => {
  moves.forEach((move) => {
    if (
      move.row >= 0 &&
      move.row <= maxRows &&
      move.col >= 0 &&
      move.col <= maxCols
    ) {
      document
        .querySelector(`[row-id='${move.row}'][col-id='${move.col}']`)
        ?.classList.add("active");
    }
  });
};

const resetBoard = () => {

  const squareElt = document.getElementsByClassName('square');

  Array.from(squareElt).forEach(elt => {
    elt.classList.remove('active')
    elt.classList.remove('selected')
  })

}

function App() {
  const rows = 8;
  const cols = 8;

  const grid: string[][] = [];

  const handleClickHandler = (ev: any) => {
    console.log(ev);

    ev.target.classList.add("selected");

    const selectedRow: number = parseInt(ev.target.getAttribute("row-id"));

    const selectedCol: number = parseInt(ev.target.getAttribute("col-id"));

    const moves = findAllMoves(selectedRow, selectedCol);

    console.log(moves);

    highlightFeasibleMoves(rows, cols, moves);
  };

  for (let i = 0; i < rows; i++) {
    let arr = [];

    for (let j = 0; j < cols; j++) {
      if (j % 2 === 0) arr.push("white");
      else arr.push("black");
    }

    if (i % 2 === 0) grid.push(arr);
    else grid.push(arr.reverse());
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={resetBoard}>Reset</button>
        <table className="chess-board">
          <thead></thead>
          <tbody>
            {grid.map((row, rowIdx) => {
              return (
                <tr>
                  {row.map((col, colIdx) => {
                    return (
                      <td
                        width="10px"
                        className={`square ${col}`}
                        onClick={(ev) => handleClickHandler(ev)}
                        row-id={rowIdx}
                        col-id={colIdx}
                      ></td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
