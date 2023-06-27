class Cell {
  constructor(i, j) {
    const cellWidth = 25;
    this.i = i;
    this.j = j;
    this.x = i * cellWidth;
    this.y = j * cellWidth;
    this.cellWidth = cellWidth;
    this.neighborCount = 0;
    this.isMine = false;
    this.revealed = false;
  }
  show() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.cellWidth, this.cellWidth);
    if (this.revealed) {
      if (this.isMine) {
        fill(127);
        ellipse(
          this.x + this.cellWidth * 0.5,
          this.y + this.cellWidth * 0.5,
          this.cellWidth * 0.5
        );
      } else {
        fill(200);
        rect(this.x, this.y, this.cellWidth, this.cellWidth);
        if (this.neighborCount > 0) {
          fill(0);
          text(
            this.neighborCount,
            this.x + this.cellWidth * 0.5,
            this.y + this.cellWidth - 6
          );
        }
      }
    }
  }
  countMines() {
    let total = 0;
    if (this.isMine) {
      this.neighborCount = -1;
      return;
    }
    for (let xoff = -1; xoff <= 1; xoff++) {
      let i = this.i + xoff;
      if (i < 0 || i >= cols) continue;
      for (let yoff = -1; yoff <= 1; yoff++) {
        let j = this.j + yoff;
        let neighbor = grid[i][j];
        if (j < 0 || j >= rows) continue;
        if (neighbor.isMine) total++;
      }
    }
    this.neighborCount = total;
  }
  contains(outX, outY) {
    return (
      outX > this.x &&
      outX < this.x + this.cellWidth &&
      outY > this.y &&
      outY < this.y + this.cellWidth
    );
  }
  reveal() {
    this.revealed = true;
    if (this.neighborCount == 0) this.floodFill();
  }
  floodFill() {
    for (let xoff = -1; xoff <= 1; xoff++) {
      let i = this.i + xoff;
      if (i < 0 || i >= cols) continue;
      for (let yoff = -1; yoff <= 1; yoff++) {
        let j = this.j + yoff;
        if (j < 0 || j >= rows) continue;
        const neighbor = grid[i][j];
        if (!neighbor.revealed) {
          neighbor.reveal();
          if (neighbor.neighborCount == 0) neighbor.floodFill(); // use recursion
        }
      }
    }
  }
}
