const 정답 = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "🥳 정답이예요 🥳";
    div.style =
      "display:flex ; justify-content: center; align-items:center; position: absolute; top:40vh; left:40vw; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();

    attempts++;
    index = 0;
  };

  const gameoverGood = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameoverGood();
    clearInterval(timer);
  };

  const GameOverBad = () => {
    window.removeEventListener("keydown", handleKeydown);
    DisplayGameOverBad();
    clearInterval(timer);
  };

  const handleKeyColor = (입력한_글자, color) => {
    const KeyBlock = document.querySelector(
      `.key-block[data-key='${입력한_글자}']`
    );
    if (KeyBlock) {
      KeyBlock.style.backgroundColor = color;
      KeyBlock.style.color = "white";
    }
  };

  const handleEnterKey = () => {
    if (index !== 5) return; // 입력이 다섯 글자가 아닐 경우에는 Enter 키 동작을 막음

    let 맞은_갯수 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];

      if (입력한_글자 === 정답_글자) {
        맞은_갯수++;
        block.style.backgroundColor = "#6aaa64";
        handleKeyColor(입력한_글자, "#6aaa64");
      } else if (정답.includes(입력한_글자)) {
        block.style.backgroundColor = "#c9b458";
        handleKeyColor(입력한_글자, "#c9b458");
      } else {
        block.style.backgroundColor = "#787c7e";
        handleKeyColor(입력한_글자, "#787c7e");
      }
      block.style.color = "white";
    }

    if (맞은_갯수 === 5) gameoverGood();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      index--; // 먼저 index를 줄임
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index}']`
      );
      if (preBlock) preBlock.innerText = "";
    }
  };

  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (e.key === "Backspace") {
      handleBackspace();
    } else if (index === 5 && e.key === "Enter") {
      handleEnterKey();
    } else if (65 <= keyCode && keyCode <= 90 && index < 5) {
      if (thisBlock) {
        thisBlock.innerText = key;
        index++;
      }
    }
  };

  const handleKeyclick = (e) => {
    const boardKey = e.target.dataset.key;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (boardKey === "back") {
      handleBackspace();
    } else if (boardKey === "ENTER") {
      handleEnterKey();
    } else if (index < 5 && /^[A-Z]$/.test(boardKey)) {
      if (thisBlock) {
        thisBlock.innerText = boardKey;
        index++;
      }
    }
  };

  const keyBoard = document.querySelectorAll(".key-block, .key-block-01");
  keyBoard.forEach((key) => {
    key.addEventListener("click", handleKeyclick);
  });

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      if (timeDiv) timeDiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
