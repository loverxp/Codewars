// https://www.codewars.com/kata/5a0573c446d8435b8e00009f/solutions/javascript
enum Direction {
    Up = 0,
    Left,
    Down,
    Right
}

class FindMe {
    direction = Direction.Left;
    x = 0;
    y = 0;

    coord(){
        return [this.x, this.y];
    }

    parse(path: string) {
        if (path.length == 0) {
            return;
        }
        const i = parseInt(path);
        if (isNaN(i)) {
            const c = path[0];
            switch (c) {
                case 'r':
                    this.direction = (this.direction + 3) % 4
                    break;

                case 'l':
                    this.direction = (this.direction + 1) % 4
                    break;

                case 'L':
                case 'R':
                    this.direction = (this.direction + 2) % 4
                    break;
                default:
                    throw new Error('');
            }
            this.parse(path.substr(1));
        }
        else {
            const l = i.toString().length;
            switch (this.direction) {
                case Direction.Left:
                    this.x -= i;
                    break;
                case Direction.Down:
                    this.y -= i;
                    break;
                case Direction.Right:
                    this.x += i;
                    break;
                case Direction.Up:
                    this.y += i;
                    break;

            }
            this.parse(path.substr(l));
        }
    }
}

const findMe = new FindMe();

function IamHere(path: string) {
    findMe.parse(path);
    const result = findMe.coord()
    console.log(result);
    return result;
}

IamHere("");
IamHere("RLrl");
IamHere("r5L2l4");
IamHere("r5L2l4");
IamHere("10r5r0");
IamHere("10r5r0");