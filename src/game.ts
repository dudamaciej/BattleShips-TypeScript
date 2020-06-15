import newsingleField from '../src/singleField';
import Ship from '../src/ship';
import SingleField from '../src/singleField';
import { shipTypes, directionTypes } from '../src/enums';


class Game {

    playerBoard: HTMLDivElement = document.querySelector('#playerBoard');
    enemyBoard: HTMLDivElement = document.querySelector('#enemyBoard');
    fleetGarage: HTMLDivElement = document.querySelector('#shipGarage');

    shipNameInput: HTMLInputElement = document.querySelector('#shipNameInput');
    foreCoordinatesInput: HTMLInputElement = document.querySelector('#foreCoordinatesInput');
    directionInput: HTMLInputElement = document.querySelector('#directionInput');
    setShipsBtn: HTMLButtonElement = document.querySelector('#setBtn');
    scoreValue: HTMLDivElement = document.querySelector('.scoreValue');
    clearScoreBtn: HTMLDivElement = document.querySelector('.clearBtn');

    playerBattleField: SingleField[];
    enemyBattleField: SingleField[];
    player: string;
    enemy: string;
    currentTurn: string;
    playerShipFleet: Ship[];
    enemyShipFleet: Ship[];
    playerBoardBin: number[][];
    gameStatus: string;
    score: string;
    playerScore: number;
    enemyScore: number;

    constructor() {
        this.playerShipFleet = [];
        this.enemyShipFleet = [];
        this.playerBattleField = [];
        this.enemyBattleField = [];
        this.player = "player";
        this.enemy = "enemy";
        this.currentTurn = "none";
        this.gameStatus = "preparation"
        this.playerScore = 0;
        this.enemyScore = 0;
        
        this.score = `${this.playerScore}:${this.enemyScore}`;
        this.scoreValue.innerHTML = this.score;
        this.playerBoardBin = this.createArrayWithO();

        this.createBoard(this.playerBoard, this.playerBattleField, this.player);
        this.createBoard(this.enemyBoard, this.enemyBattleField, this.enemy);
        this.setShipsBtn.addEventListener('click', () => this.setShipOnBoard(this.shipNameInput.value, this.foreCoordinatesInput.value, this.directionInput.value, this.playerBattleField, this.playerShipFleet));
        this.enemyBoard.addEventListener('click', () => this.playerShoot(event, this.enemyBattleField, this.enemyShipFleet));
        this.clearScoreBtn.addEventListener('click',()=>this.clearScore())
        this.chceckScoreInLocalStroage();
    }

    chceckScoreInLocalStroage(){
        
    }
    clearScore(){
        this.playerScore = 0;
        this.enemyScore = 0;
        this.score = `${this.playerScore}:${this.enemyScore}`;
        this.scoreValue.innerHTML = this.score;
    }

    setShipOnBoard(shipNameInput, startCoordinatesInput, directionInput, playerField, shipsFleet) {
        if (shipsFleet.length < 5 && this.gameStatus == "preparation") {

            let existingShip = shipsFleet.find(ship => ship.name === shipNameInput);
            if (!existingShip) {

                if ((<any>Object).values(shipTypes).includes(shipNameInput)) {

                    if ((<any>Object).values(directionTypes).includes(directionInput)) {
                        var shipName = shipNameInput;
                        var numberOfFields = shipName.slice(1, 2);
                        var startCoordinates = startCoordinatesInput;
                        var startX = startCoordinates.slice(0, 1);
                        var startY = startCoordinates.slice(1, 2);
                        var direction = directionInput;

                        if (this.playerBoardBin[parseInt(startX)][parseInt(startY)] === 0) {
                            let newShip = new Ship(startX, startY, shipName, direction)
                            let firstBoxOfShip = playerField.find(value => value.id === startCoordinates);
                            firstBoxOfShip.partOfShip(shipName);
                            newShip.shipFields.push(firstBoxOfShip);
                            this.playerBoardBin[parseInt(startX)][parseInt(startY)] = 1;

                            for (var i = 1; i < numberOfFields; i++) {

                                if (direction == 'D') {

                                    var newStartX = parseInt(startX) + i;
                                    var nextBoxOfShip = playerField.find(value => value.id === `${newStartX}${startY}`);
                                    this.playerBoardBin[newStartX][parseInt(startY)] = 1;
                                }
                                else if (direction == "R") {

                                    var newStartY = parseInt(startY) + i;
                                    var nextBoxOfShip = playerField.find(value => value.id === `${startX}${newStartY}`);
                                    this.playerBoardBin[parseInt(startX)][newStartY] = 1;
                                }
                                nextBoxOfShip.partOfShip(shipName);
                                newShip.shipFields.push(nextBoxOfShip);
                            }
                            this.playerShipFleet.push(newShip);
                            if (shipsFleet.length == 5) {
                                this.setEnemyShips(this.enemyShipFleet, this.enemyBattleField);
                                this.gameStatus = "war";
                                this.currentTurn = "player";
                            }
                            console.log(`${shipNameInput} - set on field`)
                        } else {
                            console.log("There is ship")
                        }
                    } else {
                        console.log("Wrong direction")
                    }

                } else {
                    console.log(`${shipNameInput} - wrong name`)
                }

            } else {
                console.log(`${shipNameInput} already exist`)
            }

        }
    }

    setEnemyShips(enemyFleet, enemyField) {
        let choosenSetUp = this.randomSetUpEnemyShips()
        enemyField.forEach(field => {
            let x = parseInt(field.id.substring(0, 1));
            let y = parseInt(field.id.substring(1, 2));
            if (choosenSetUp[x][y] === 1) {
                let name = "s1";
                let direction = "";
                let existingShip = enemyFleet.find(ship => ship.name === name);
                let currentField = enemyField.find(value => value.id === `${x}${y}`);
                if (!existingShip) {
                    if (choosenSetUp[x][y + 1] === 1) {
                        direction = "R";
                    } else {
                        direction = "D";
                    }
                    let newShip = new Ship(x, y, name, direction);
                    currentField.partOfShip(name);
                    newShip.shipFields.push(currentField);
                    enemyFleet.push(newShip);
                } else {
                    currentField.partOfShip(name);
                    existingShip.shipFields.push(currentField);
                }

            } else if (choosenSetUp[x][y] === 2) {
                let name = "s2";
                let direction = "";
                let existingShip = enemyFleet.find(ship => ship.name === name);
                let currentField = enemyField.find(value => value.id === `${x}${y}`);
                if (!existingShip) {
                    if (choosenSetUp[x][y + 1] === 2) {
                        direction = "R";
                    } else {
                        direction = "D";
                    }
                    let newShip = new Ship(x, y, name, direction);
                    currentField.partOfShip(name);
                    newShip.shipFields.push(currentField);
                    enemyFleet.push(newShip);
                } else {
                    currentField.partOfShip(name);
                    existingShip.shipFields.push(currentField);
                }
            } else if (choosenSetUp[x][y] === 3) {
                let name = "s3";
                let direction = "";
                let existingShip = enemyFleet.find(ship => ship.name === name);
                let currentField = enemyField.find(value => value.id === `${x}${y}`);
                if (!existingShip) {
                    if (choosenSetUp[x][y + 1] === 3) {
                        direction = "R";
                    } else {
                        direction = "D";
                    }
                    let newShip = new Ship(x, y, name, direction);
                    currentField.partOfShip(name);
                    newShip.shipFields.push(currentField);
                    enemyFleet.push(newShip);
                } else {
                    currentField.partOfShip(name);
                    existingShip.shipFields.push(currentField);
                }
            } else if (choosenSetUp[x][y] === 4) {
                let name = "s4";
                let direction = "";
                let existingShip = enemyFleet.find(ship => ship.name === name);
                let currentField = enemyField.find(value => value.id === `${x}${y}`);
                if (!existingShip) {
                    if (choosenSetUp[x][y + 1] === 4) {
                        direction = "R";
                    } else {
                        direction = "D";
                    }
                    let newShip = new Ship(x, y, name, direction);
                    currentField.partOfShip(name);
                    newShip.shipFields.push(currentField);
                    enemyFleet.push(newShip);
                } else {
                    currentField.partOfShip(name);
                    existingShip.shipFields.push(currentField);
                }
            } else if (choosenSetUp[x][y] === 5) {
                let name = "s5";
                let direction = "";
                let existingShip = enemyFleet.find(ship => ship.name === name);
                let currentField = enemyField.find(value => value.id === `${x}${y}`);
                if (!existingShip) {
                    if (choosenSetUp[x][y + 1] === 5) {
                        direction = "R";
                    } else {
                        direction = "D";
                    }
                    let newShip = new Ship(x, y, name, direction);
                    currentField.partOfShip(name);
                    newShip.shipFields.push(currentField);
                    enemyFleet.push(newShip);
                } else {
                    currentField.partOfShip(name);
                    existingShip.shipFields.push(currentField);
                }
            }
        });

    }

    playerShoot(e, enemyField, enemyShipFleet) {
        if (this.gameStatus == "war" && this.currentTurn == "player") {

            var id = e.target.id.substring(5, 7);
            var shootedField = enemyField.find(value => value.id === id);
            if (shootedField.isHit == true) {
                console.log("You shoted this field");
            } else {
                shootedField.takeHit();
                if (shootedField.isShipPart == true) {
                    var attackedShip = enemyShipFleet.find(ship => ship.name === shootedField.partOfWhatShip);
                    console.log("You hit ship");
                    if (attackedShip.isItSunked() == true) {
                        console.log(`You destoryed ${attackedShip.name}`);
                        attackedShip.isSunked();
                        let shipIndexInFleet = enemyShipFleet.indexOf(attackedShip);
                        enemyShipFleet.splice(shipIndexInFleet, 1);
                        this.isGameEnd();
                    }

                } else {
                    console.log("You missed");
                    this.currentTurn = "enemy";
                    this.enemyShoot(this.playerShipFleet, this.playerBattleField);
                }
            }
        }
    }

    enemyShoot(playerShipFleet, playerBattleField) {
        if (this.gameStatus == "war") {
            while (this.currentTurn == "enemy") {

                let shootedField = playerBattleField[Math.floor(Math.random() * this.playerBattleField.length)]
                if (shootedField.isHit == true) {
                } else {
                    shootedField.takeHit();
                    if (shootedField.isShipPart == true) {
                        var attackedShip = playerShipFleet.find(ship => ship.name === shootedField.partOfWhatShip);
                        console.log("Enemy hit your ship");
                        while (!attackedShip.isItSunked() && this.currentTurn == "enemy") {
                            let shootDirecion = ["D", "R", "L", "U"][Math.floor(Math.random() * 4)];
                            let newX = shootedField.x;
                            let newY = shootedField.y;
                            switch (shootDirecion) {
                                case "D":
                                    if (shootedField.x != 9) {
                                        newX = shootedField.x + 1;
                                    }
                                    break;
                                case "R":
                                    if (shootedField.y != 9) {
                                        newY = shootedField.y + 1;
                                    }
                                    break;
                                case "L":
                                    if (shootedField.y != 0) {
                                        newY = shootedField.y - 1;
                                    }
                                    break;
                                case "U":
                                    if (shootedField.x != 0) {
                                        newX = shootedField.x - 1;
                                    }
                            }
                            let newShootedField = playerBattleField.find(field => field.id === `${newX}${newY}`);
                            newShootedField.takeHit();
                            newShootedField = shootedField;
                            if (shootedField.isShipPart == true) {
                                var attackedShip = playerShipFleet.find(ship => ship.name === shootedField.partOfWhatShip);
                                console.log("Enemy hit ship");
                                break;
                            } else {
                                console.log("Enemy missed");
                                this.currentTurn = "player";
                                break;
                            }
                        }
                        if (attackedShip.isItSunked() == true) {
                            console.log(`Enemy destoryed ${attackedShip.name}`);
                            attackedShip.isSunked();
                            let shipIndexInFleet = playerShipFleet.indexOf(attackedShip);
                            playerShipFleet.splice(shipIndexInFleet, 1);
                            this.isGameEnd();
                        }

                    } else {
                        console.log("Enemy missed");
                        this.currentTurn = "player";
                    }
                }
            }
        }
    }

    isGameEnd() {
        if (this.currentTurn == "player") {
            if (this.enemyShipFleet.length == 0) {
                console.log('PLAYER WON');
                this.gameStatus = "end";
                this.playerScore ++;
                console.log(this.playerScore)
                this.reloadGame()
            }
        } else if (this.currentTurn == "enemy") {
            if (this.playerShipFleet.length == 0) {
                console.log('ENEMY WON');
                this.gameStatus = "end";
                this.enemyScore ++;
                this.reloadGame()

            }
        }
    }

    reloadGame() {
        this.clearBoard(this.playerBoard);
        this.clearBoard(this.enemyBoard);
        this.playerShipFleet = [];
        this.enemyShipFleet = [];
        this.playerBattleField = [];
        this.enemyBattleField = [];
        this.currentTurn = "none";
        this.gameStatus = "preparation";
        this.playerBoardBin = this.createArrayWithO();
        this.createBoard(this.playerBoard, this.playerBattleField, this.player);
        this.createBoard(this.enemyBoard, this.enemyBattleField, this.enemy);
        this.score = `${this.playerScore}:${this.enemyScore}`;
        this.scoreValue.innerHTML = this.score;
       
    }

    clearBoard(parent) {
        parent.querySelectorAll('div').forEach(n => n.remove());
    }

    createBoard(parent, battleField, owner) {

        for (var i = 0; i < 10; i++) {

            for (var j = 0; j < 10; j++) {

                const divsingleField = document.createElement('div');
                var singleField = new newsingleField(i, j, divsingleField);
                divsingleField.classList.add('singleField');
                var topPosition = i * 50;
                var leftPosition = j * 50;
                divsingleField.id = `${owner}${i}${j}`
                divsingleField.style.top = topPosition + 'px';
                divsingleField.style.left = leftPosition + 'px';
                parent.appendChild(divsingleField);
                battleField.push(singleField);

            }
        }
        console.log(battleField);
    }

    createArrayWithO() {
        let newArray = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        return newArray;
    }

    randomSetUpEnemyShips() {
        let shipSetUp;
        let random = Math.floor(Math.random() * 3) + 1;
        switch (random) {
            case 1:
                shipSetUp = [
                    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
                    [0, 3, 3, 3, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 5, 0, 0, 4, 4, 4, 4, 0, 0],
                    [0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 5, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
                break;
            case 2:
                shipSetUp = [
                    [0, 0, 0, 0, 2, 2, 0, 0, 3, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
                    [0, 0, 0, 1, 0, 0, 0, 0, 3, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 4, 4, 4, 4, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 5, 5, 5, 5, 5, 0, 0, 0, 0]
                ]
                break;
            case 3:
                shipSetUp = [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 3, 3, 3, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 5, 0, 0, 0, 0],
                    [4, 4, 4, 4, 0, 5, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 5, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 5, 0, 0, 2, 0],
                    [0, 0, 0, 0, 0, 5, 0, 0, 2, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
                ]
                break;
        }
        return shipSetUp;
    }

}
export default Game;