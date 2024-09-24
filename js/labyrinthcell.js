console.log("JavaScript erfolgreich geladen! labyrinthcell.js");

export class Cell {
    constructor(pos, size) {
        this.size = size;
        this.pos = pos;

        this.hasWall = {
            left: true,
            right: true,
            bottom: true,
            top: true,
        };

        this.visited = false;
        this.color = "#000060";
        this.borderColor = "#eee";
    }

    draw(ctx, color = this.color) {
        const size = this.size;
        const pos = this.pos;

        if (this.visited) {
            ctx.fillStyle = color;
            ctx.fillRect(pos.x * size, pos.y * size, size, size);
        }

        ctx.strokeStyle = this.borderColor;

        if (this.hasWall.left) {
            ctx.beginPath();
            ctx.moveTo(pos.x * size, pos.y * size);
            ctx.lineTo(pos.x * size, (pos.y + 1) * size);
            ctx.stroke();
        }

        if (this.hasWall.right) {
            ctx.beginPath();
            ctx.moveTo((pos.x + 1) * size, pos.y * size);
            ctx.lineTo((pos.x + 1) * size, (pos.y + 1) * size);
            ctx.stroke();
        }

        if (this.hasWall.bottom) {
            ctx.beginPath();
            ctx.moveTo(pos.x * size, (pos.y + 1) * size);
            ctx.lineTo((pos.x + 1) * size, (pos.y + 1) * size);
            ctx.stroke();
        }

        if (this.hasWall.top) {
            ctx.beginPath();
            ctx.moveTo(pos.x * size, pos.y * size);
            ctx.lineTo((pos.x + 1) * size, pos.y * size);
            ctx.stroke();
        }
    }

    removeLineBetween(other) {
        if (this.pos.x == other.pos.x) {
            if (this.pos.y == other.pos.y + 1) {
                this.hasWall.top = false;
                other.hasWall.bottom = false;
            } else if (this.pos.y + 1 == other.pos.y) {
                other.hasWall.top = false;
                this.hasWall.bottom = false;
            }
        } else if (this.pos.y == other.pos.y) {
            if (this.pos.x == other.pos.x + 1) {
                this.hasWall.left = false;
                other.hasWall.right = false;
            } else if (this.pos.x + 1 == other.pos.x) {
                other.hasWall.left = false;
                this.hasWall.right = false;
            }
        }
    }
}