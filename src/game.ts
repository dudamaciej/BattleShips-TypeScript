import newsingleField from '../src/singleField';

class Game{

    playerBoard: HTMLDivElement = document.querySelector('#playerBoard');
    enemyBoard: HTMLDivElement = document.querySelector('#enemyBoard');
    playerBattleField: number[];
    enemyBattleField: number[];
    player:string;
    enemy:string;

    constructor(){
        this.playerBattleField = [];
        this.enemyBattleField = [];
        this.player = "player";
        this.enemy = "enemy";
        this.createBoard(this.playerBoard, this.playerBattleField, this.player);
        this.createBoard(this.enemyBoard, this.enemyBattleField, this.enemy);
        
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
}
export default Game;