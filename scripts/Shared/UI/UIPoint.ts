export class UIPoint {
    pointOwner: string;
    point: number;

    constructor(pointOwner: string, point: number) {
        this.pointOwner = pointOwner;
        this.point = point;
    }

    toString() {
        return this.pointOwner + ' : ' + this.point.toString()
    }
}