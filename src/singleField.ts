class SingleField{
    x:number;
    y:number;
    isHit:boolean;

    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
        this.isHit = false;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    takeHit() {
        this.isHit = true;
    }

    isItHit(){
        return this.isHit;
    }
}
export default SingleField;
