import newsingleField from '../src/singleField';
import Ship from '../src/ship';

class Game{

    playerBoard: HTMLDivElement = document.querySelector('#playerBoard');
    enemyBoard: HTMLDivElement = document.querySelector('#enemyBoard');
    fleetGarage:HTMLDivElement = document.querySelector('.shipGarage');
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
        this.createFleetGarage(this.fleetGarage);
    }
    
    createBoard(parent, battleField, owner){

        for(var i = 0; i < 10; i ++){
           
            for(var j = 0; j< 10; j++){

                let singleField = new newsingleField(i,j);
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

    createFleetGarage(fleetGarage){
        for(var i = 1; i <= this.fleetSize + 1; i++){
            
            const singleGarageSpot = document.createElement('div');
            singleGarageSpot.classList.add('singleGarageSpot');
            this.createShipInGarage(i,singleGarageSpot);
           

            fleetGarage.appendChild(singleGarageSpot);
            
        }
    }

    createShipInGarage(shiplength,parentDiv){
        const shipDiv = document.querySelector('div');
        shipDiv.classList.add('shipDiv');

        for(var i = 0; i < shiplength; i++){
           const partOfShip = document.querySelector('div');
           partOfShip.classList.add('partOfShip');
           partOfShip.style.top = 0 +'px';
           partOfShip.style.left = i * 30 + 'px';
           shipDiv.appendChild(partOfShip);
        }

        parentDiv.appendChild(shipDiv);
    }
}
export default Game;