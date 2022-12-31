// 콜백 함수
// A function that enters a parameter. 파라미터에 들어가는 함수
//It is used when we want to execute the code sequentially. 코드를 순차저으로 시행하고 싶을 떄 사용한다.
//ex) document.querySelector('.button').addEventListener('click', function(){ 블라블라 }) //클릭한 후 함수시행
//ex2) setTimeout(function(){ 블라블라 }, 1000 )

//여기서 질문이 생길 수 있다.

//자바 스크립트는 synchronous language 동기적 언어 이기 떄문에 어차피(anyway) 순서대로 진행된다.
//굳이, 콜백함수를 써야하는 이유는? 
//예를들어 회사에 가서 A 라는 함수 뒤에 console.log("haha") 를 시행하고 싶어. 그런데 다른 사람은 console.log("hihi")를 시행하고 싶어
//이렇게 여러 순서들이 겹칠 때에는 내 함수가 언제 어떻게 시행될지 장담하기 어렵다. 왜냐하면 함수의 크기(depending on function size)에 따라 시행속도(the speed of implementation)가 다르기 떄문이다.


window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    // When the user clicked on the tile, it is to record the information about which user clicked. 
    //유저카 타일을 클릭 할 떄, 어떤 유저가 클릭했는지를 기록
    let currentPlayer = 'X';
    let isGameActive = true; //Is it okay if the game goes without any problems?

    const PLAYER_X_WON = 'PLAYER_X_WON';
    const PLAYER_O_WON = 'PLAYER_O_WON';
    const TIE = 'TIE';


    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    //we have three different winning condition.
    //When some user eat the same tile horizontally 
    //When some user eat the same tile vertically 
    //When some user eat the same tile diagonally

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false; //라운드 피니시로 이름 바꿔도 될듯
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            //If any of a,b,c, is empty, execute this if statement
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYER_X_WON : PLAYER_O_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }

    const announce = (type) => {
        switch(type){
            case PLAYER_O_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYER_X_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };
    // It determines whether the clicked tile is already a selected tile or not.
    //클릭된 타일이 이미 선택된 타일인지 아닌지를 결정하기 위함.

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }
    //아까 봤던 보드에 클릭되었다는 히스토리를 남기기 위해 

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }


    const userAction = (tile, index) => {
        //이 특정 타일이 이전에 클릭된건지 확인해 볼 필요가 있고, 게임이 문제 없이 진행되도 되는지
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer; //이터 텍스트 엠프티 하니간 현재 플레이어를 여기다 저장
            tile.classList.add(`player${currentPlayer}`); //html 요소의 클래스 명을 바꾸거나 수정할때 쓰임
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }



    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }


    // 일단 클릭이 되야 트리거 되니까    첫빠따!!!
    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });
// 클릭 되면 어떤 일이 일어나야하지? 그 함수를 userAction 이라고 하자.


    resetButton.addEventListener('click', resetBoard);
});



//var , let , const

//var : multiple declaration would be possible / Reallocateable
//-> Last assigned value is stored in variable
//-> Although it has the advantage of being used flexibly, it can be difficult to find bugs if the amount of code increases.

//let: multiple declaration would not be possible /  Reallocateable

//const : multiple declaration would not be possible /  Not Reallocateable






//구문 정리
//if, else 
//and => &&
//or => ||
// switch(param){
//     case a:
//         asdasd
//         break;
//     case b:
//         asdasdsad
//         break;
//     case c:
//         sadasdasd
// }





// a === 20 ? true : false

//if(a === 20){
//     return true
// } else{
//     return false
// }





//함수표현 function declarations
// function first() {
//     sdaksdaskdaksd
// }

//function expression
// const first = function() {} --> Anonymous Function
// var first = () => {
//     sadsdasdsd
// }


//what is defferent between these two?

//For that we have to understand Hoisting.

// Means that the interpreter preallocates memory space for variables and functions before declaring them. For variables declared as var, initialize the variable as undefined when hoisting. On the other hand, for variables declared as let and const, the variable is not initialized when hoisting.


// messageFunction1();
// messageFunction2();

// function messageFunction1(){
//   return 'hello world';
// };

// let messageFunction2 = function(){
//   return 'hello world';
// };


// ---> 해석순서

// function messageFunction1(){
//     return 'hello world';
//   };
  
//   let messageFuntion2;
  
//   messageFunction1(); // 'hello world'
//   messageFunction2(); // 'messageFunction2' is not a function
  
//   messageFunction2 = function(){
//     return 'hello world';
//   };






