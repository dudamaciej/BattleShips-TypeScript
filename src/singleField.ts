class SingleField{
    x:number;
    y:number;
    isHit:boolean;
    isShipPart:boolean;
    id:string;

    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
        this.isHit = false;
        this.isShipPart = false;
        this.id =`${x}${y}`;
    }

    partOfShip(){
        this.isShipPart = true;   
    }

    takeHit() {
        this.isHit = true;
    }

    isItHit(){
        return this.isHit;
    }
}
export default SingleField;
