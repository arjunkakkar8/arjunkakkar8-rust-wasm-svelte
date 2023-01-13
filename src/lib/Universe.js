export class Universe {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cells = new Uint8Array(width * height)

        this.cells.forEach((_, i) => {
            this.cells[i] = (i % 2 === 0 || i % 11 === 0 || i % 629 === 0) ? 1 : 0;
        });
    }

    get_index(row, col) {
        return row * this.width + col;
    }

    live_neighbor_count(row, col) {
        let count = 0;

        for (const delta_row of [this.height - 1, 0, 1]) {
            for (const delta_col of [this.width - 1, 0, 1]) {
                if (delta_row === 0 && delta_col === 0) {
                    continue;
                }

                let neighbor_row = (row + delta_row) % this.height;
                let neighbor_col = (col + delta_col) % this.width;
                let idx = this.get_index(neighbor_row, neighbor_col);
                count += this.cells[idx];
            }
        }

        return count;
    }

    tick() {
        const next = new Uint8Array(this.width * this.height);

        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                const idx = this.get_index(row, col);
                let cell = this.cells[idx];
                let live_neighbors = this.live_neighbor_count(row, col);

                if (cell === 1 && live_neighbors < 2) {
                    cell = 0;
                } else if (
                    cell === 1 &&
                    (live_neighbors === 2 || live_neighbors === 3)
                ) {
                    cell = 1;
                } else if (cell === 1 && live_neighbors > 3) {
                    cell = 0;
                } else if (cell === 0 && live_neighbors === 3) {
                    cell = 1;
                }

                next[idx] = cell;
            }
        }

        this.cells = next;
    }
}