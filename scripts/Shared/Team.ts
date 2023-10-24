export class Team {
    name: string;
    color: string;
    members: string[];

    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
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
}