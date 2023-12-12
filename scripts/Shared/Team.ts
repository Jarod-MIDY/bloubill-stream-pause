export class Team {
    name: string;
    color: string;
    members: string[] = [];
    points: number;

    constructor(name: string, color: string, points: number = 0) {
        this.name = name;
        this.color = color;
        this.points = points;
    }

    getName() {
        return this.name
    }

    addPoint(point: number) {
        this.points += point;
    }

    getPoints() {
        return this.points;
    }

    resetPoints() {
        this.points = 0;
    }

    addMember(member : string) {
        this.members.push(member);
    }

    removeMember(member : string): boolean {
        const index = this.members.indexOf(member);
        if (index > -1) { 
            this.members.splice(index, 1);
            return true;
        }
        return false;
    }

    getMembers(): string[] {
        return this.members
    }

    setMembers(members: string[]) {
        this.members = members
    }

    findMember(member: string): boolean {
        return this.members.includes(member)
    }
}