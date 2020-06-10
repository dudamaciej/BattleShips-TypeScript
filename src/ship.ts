class Ship {
    shipFields: string[];
    shipLength:number;
    startX:number;
    startY:number;
    name:string;
    direction:string;
    isSunk:boolean;
    constructor(startX:number,startY:number,name:string,direction:string){
        this.startX = startX;
        this.startY = startY;
        this.name = name;
        this.direction = direction;
        this.shipFields = [];
        this.isSunk = false
    }
}
export default Ship;