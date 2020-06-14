class SingleField{
    x:number;
    y:number;
    isHit:boolean;
    isShipPart:boolean;
    id:string;
    body:HTMLDivElement;
    partOfWhatShip:string;

    constructor(x:number, y:number,div:HTMLDivElement){
        this.x = x;
        this.y = y;
        this.isHit = false;
        this.isShipPart = false;
        this.id =`${x}${y}`;
        this.body = div;
        this.partOfWhatShip = "none";
    }

    partOfShip(shipname){
        this.isShipPart = true;
        this.body.classList.add('ship');   
        this.partOfWhatShip = shipname;
    }

    takeHit() {
        this.isHit = true;
        if(this.isShipPart == true){
            this.body.classList.remove('ship');
            this.body.classList.add('hit');
        }else{
            this.body.classList.add('missed');
        }  
    }

}
export default SingleField;
