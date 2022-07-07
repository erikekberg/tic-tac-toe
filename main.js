
const player = (name, token) => {
    return { name, token }
}

const gameManager = (() => {

    const boxes = [...document.querySelectorAll(".box")];

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            play(box);
        })
    })

    const players = [];

    players[0] = player("erik", "x");
    players[1] = player("enemy", "0");
    currentPlayer = 0;

    const board = [
        null, null, null,
        null, null, null,
        null, null, null];

    const updateBoard = () => {
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].textContent = board[i];
        }
    }
    const play = (box) => {
        if (hasWon()) { return }
        let id = box.id;
        if (!board[id]) {
            board[id] = players[currentPlayer].token;
            if (hasWon()) {
                console.log(players[currentPlayer].name + " has won");
                winnerText = document.querySelector(".winner");
                winnerText.textContent = "Congratulations: " + players[currentPlayer].name + " has won!";
            }
            currentPlayer = currentPlayer === 0 ? 1 : 0;
            updateBoard();
        }
        console.log(currentPlayer.name);
    }
    const start = () => {
        players[0].name = document.querySelector("#name-player-one").value;
        players[0].token = document.querySelector("#token-player-one").value[0] ? document.querySelector("#token-player-one").value[0] : "x";
        players[1].name = document.querySelector("#name-player-two").value;
        players[1].token = document.querySelector("#token-player-two").value[0] ? document.querySelector("#token-player-two").value[0] : "0";
    }
    const startButton = document.querySelector("#start-button");
    startButton.addEventListener("click", () => {
        reset();
        start();
    })

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = null;
        }
        winnerText = document.querySelector(".winner");
        winnerText.textContent = "";
        updateBoard();
        start();
    }

    const hasWon = () => {
        if (
            (board[0] === board[1] && board[1] === board[2] && board[0] !== null) ||
            (board[3] === board[4] && board[4] === board[5] && board[3] !== null) ||
            (board[6] === board[7] && board[7] === board[8] && board[6] !== null) ||
            (board[0] === board[3] && board[3] === board[6] && board[0] !== null) ||
            (board[1] === board[4] && board[4] === board[7] && board[1] !== null) ||
            (board[2] === board[5] && board[5] === board[8] && board[2] !== null) ||
            (board[0] === board[4] && board[4] === board[8] && board[0] !== null) ||
            (board[2] === board[4] && board[4] === board[6] && board[2] !== null)
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    return { play }

})();

gameManager.play()