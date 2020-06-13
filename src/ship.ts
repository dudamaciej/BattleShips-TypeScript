import SingleField from "./singleField";

class Ship {
    shipFields: SingleField[];
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
        this.isSunk = false;
    }
    isSunked(){
        this.isSunk = true;
        this.shipFields.forEach(element => {
            element.body.classList.add('destroyed')
        });
    }
    isItSunked(){
        let checkerArray =[];
       this.shipFields.forEach(element=>{
           element.isHit 
           checkerArray.push(element.isHit);
       })
       if(checkerArray.every(Boolean)){
           return true;
       }else{
           return false;
       }
    }
}
export default Ship;