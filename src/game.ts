import newsingleField from '../src/singleField';
import Ship from '../src/ship';
import SingleField from '../src/singleField';

class Game{

    playerBoard: HTMLDivElement = document.querySelector('#playerBoard');
    enemyBoard: HTMLDivElement = document.querySelector('#enemyBoard');
    fleetGarage:HTMLDivElement = document.querySelector('#shipGarage');

    shipNameInput: HTMLInputElement = document.querySelector('#shipNameInput');
    foreCoordinatesInput: HTMLInputElement = document.querySelector('#foreCoordinatesInput');
    directionInput: HTMLInputElement = document.querySelector('#directionInput');
    setShipsBtn: HTMLButtonElement = document.querySelector('#setBtn');

    playerBattleField: number[];
    enemyBattleField: number[];
    player:string;
    enemy:string;
    fleetSize:number;
  
    constructor(){
        this.fleetSize = 5;
        this.playerBattleField = [];
        this.enemyBattleField = [];
        this.player = "player";
        this.enemy = "enemy";
        this.createBoard(this.playerBoard, this.playerBattleField, this.player);
        this.createBoard(this.enemyBoard, this.enemyBattleField, this.enemy);

        this.setEnemyShips(this.enemyBattleField);
        if(this.fleetSize != 0){ 
        this.setShipsBtn.addEventListener('click',()=>this.setShipOnBoard(this.shipNameInput.value,this.foreCoordinatesInput.value,this.directionInput.value,this.playerBattleField,this.fleetSize));
        }
        this.enemyBoard.addEventListener('click',()=>this.playerShoot(event,this.enemyBattleField));
    }
    setShipOnBoard(shipNameInput,startCoordinatesInput,directionInput,playerField,fleetSize){
        var fleetSize = fleetSize;
        var shipName = shipNameInput;
        var numberOfFields = shipName.slice(1,2);
        var startCoordinates = startCoordinatesInput;
        var startX = startCoordinates.slice(0,1);
        var startY = startCoordinates.slice(1,2);
        var direction = directionInput;
        
        let newShip = new Ship(startX,startY,shipName,direction)
        let firstBoxOfShip  = playerField.find(value => value.id ===startCoordinates);
        firstBoxOfShip.partOfShip();
        newShip.shipFields.push(firstBoxOfShip);

        for(var i = 1; i < numberOfFields; i++){

            if( direction == 'D' ){

                var newStartX = parseInt(startX) + i;
                var nextBoxOfShip = playerField.find(value => value.id ===`${ newStartX}${startY}`); 
              
            }
            else if(direction == "R"){

                var newStartY = parseInt(startY) + i;
                var nextBoxOfShip = playerField.find(value=> value.id===`${ startX}${newStartY}`);
                
            }
            nextBoxOfShip.partOfShip();
               //nextBoxOfShip.classList.add('ship');
               newShip.shipFields.push(nextBoxOfShip);
        }
       
        console.log(newShip);
    }

    setEnemyShips(enemyField){
        var availableFields = enemyField;
        for( var i = 1; i <= this.fleetSize; i++){

            let randomId = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
            let firstBoxOfShip = enemyField.find(value=>value.id === randomId);
        }
    }

    playerShoot(e,enemyField){
        var id = e.target.id.substring(5,7);
        console.log(id);
        var shootedField = enemyField.find(value=> value.id===id);
        if(shootedField.isShipPart == true){
            // zaznaczamy, ze trafiony
            //czy statek ma jakies czesci jesli nie, to kolor zatopiony
            //sprawdzam czy sa jakies statki jesli tak to player shoot sie powtarza, az nie trafi lub sie skoncza statki
        }else{
            // zaznaczam, ze pudlo i przekazuje ture botowi
        }
    }

    createBoard(parent, battleField, owner){

        for(var i = 0; i < 10; i ++){
           
            for(var j = 0; j< 10; j++){

                var singleField = new newsingleField(i,j);
                const divsingleField = document.createElement('div');
                divsingleField.classList.add('singleField');
                var topPosition = j * 50;
                var leftPosition = i * 50;
                divsingleField.id = `${owner}${j}${i}`
                divsingleField.style.top = topPosition + 'px';
                divsingleField.style.left = leftPosition+ 'px';
                parent.appendChild(divsingleField);
                battleField.push(singleField);

            }
        }  
        console.log(battleField);   
    }
    
}
export default Game;