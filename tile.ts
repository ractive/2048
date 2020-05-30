class Tile {
    public static readonly WIDTH = 28;
    private static readonly OFFSET_X = 26;
    private static readonly OFFSET_Y = 5;
    private _row: number;
    private _column: number;
    private _n: number;
    private sprite: Sprite;

    constructor(n: number, row: number, column: number) {
        const animationImage = image.create(Tile.WIDTH - 2, Tile.WIDTH - 2);
        this.sprite = sprites.create(animationImage);
        this.sprite.setPosition(Tile.OFFSET_X + column * (Tile.WIDTH - 1) + 14, Tile.OFFSET_Y + row * (Tile.WIDTH - 1) + 14)
        const frames = 4;
        const step = animationImage.height / frames;
        for (let i = 0; i < frames; i++) {
            animationImage.fillRect((animationImage.width - i * step) / 2, (animationImage.height - i * step) / 2, i * step, i * step, Tile.colorFor(n));
            pause(40);
        }
        this.n = n;
    }

    set n(n: number) {
        if (this._n * 2 === n) {
            const img = image.create(Tile.WIDTH - 2, Tile.WIDTH - 2);
            img.fillRect(0, 0, img.width, img.height, white);
            Tile.print(n, img, fontDarkColor);
            this.sprite.setImage(img);
            setTimeout(() => {
                if (this.sprite) {
                    this.sprite.setImage(Tile.createImage(n));
                }
            }, 175);
        } else {
            this.sprite.setImage(Tile.createImage(n));
        }
        this._n = n;
    }

    get n(): number {
        return this._n;
    }

    get row(): number {
        return this._row;
    }
    
    get column(): number {
        return this._column;
    }

    public destroy() {
        this.sprite.destroy();
        this.sprite = null;
    }

    public set(row: number, column: number): boolean {
        const expectedY = Tile.OFFSET_Y + row * (Tile.WIDTH - 1) + 14;
        const expectedX = Tile.OFFSET_X + column * (Tile.WIDTH - 1) + 14;
        if (row !== this._row || column !== this._column) {
            this.sprite.setPosition(expectedX, expectedY);
            this._row = row;
            this._column = column;
            return true;
        } else {
            return false;
        }
    }

    private static colorFor(n: number): number {
        const c: number = Math.round(tileBackground2Color + ((Math.log(n) / Math.log(2) - 0))) - 1;
        return c <= 15 ? c: fontDarkColor;
    }

    private static print(n: number, img: Image, color: number) {
        const text = "" + n;
        const font = image.font5;
        let w = text.length * font.charWidth;
        let offset = (Tile.WIDTH - w) / 2;
        img.print(text, offset, (img.height - font.charHeight) / 2, color, font)
    }

    private static createImage(n: number): Image {
        const img = image.create(Tile.WIDTH - 2, Tile.WIDTH - 2);
        img.fill(Tile.colorFor(n));
        img.drawRect(0, 0, img.height, img.width, gridColor);
        Tile.print(n, img, n > 4 ? white : fontDarkColor)
        return img;
    }
}