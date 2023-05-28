function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

class Storage {
  constructor(game, localName) {
    this.localName = localName;
    if (!this.load()) {
      this.save(game);
    }
  }
  load () {
    return JSON.parse(localStorage.getItem(this.localName));
  }

  save(game) {
    localStorage.setItem(this.localName, JSON.stringify(game));
  }
}

class Game {
  scoring = {
    score: 0,
    highScore: 0,
  };

  snake = {
    x: 160,
    y: 160,
    dx: 32,
    dy: 0,
    cells: [],
    maxCells: 4
  };

  constructor(canvas) {
    this.highScoreElement = document.getElementById('high'),
    this.scoreElement = document.getElementById('score'),
    this.storage = new Storage(this, 'game');
    this.lastGame = this.storage.load();
    this.snake = new Snake(canvas, this.getParams())
  }

  addPoint(point) {
    this.score += point;

    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.storage.save(this);
    }
  }

  getParams() {
    if (this.lastGame.snake ) {
      
    }
  }
}

class Snake {
  constructor(canvas, params) {
      this.params = params;
      var lastGame = localStorage.getItem('game');
      lastGame = JSON.parse(lastGame)
      this.canvas = canvas;
      this.context = canvas.getContext('2d');
      this.grid = params.grid;
      this.highScoreElement = params.highScoreElement;
      this.scoreElement = params.scoreElement;
      this.score = lastGame.score ? lastGame.score : 0;
      this.scoreElement.innerHTML = this.score;
      this.apple = params.apple;
      this.snake = params.snake;
      this.snake.maxCells += this.score;
      this.max = 0;
      this.drawFlag = false;
  }

  loop() {
      this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
      this.drawApple();
      // move snake by it's velocity
      this.snake.x += this.snake.dx;
      this.snake.y += this.snake.dy;
      // wrap snake position horizontally on edge of screen
      if (this.snake.x < 0) {
        this.snake.x = this.canvas.width - this.grid;
      }
      else if (this.snake.x >= this.canvas.width) {
        this.snake.x = 0;
      }
       // wrap snake position vertically on edge of screen
      if (this.snake.y < 0) {
        this.snake.y = this.canvas.height - this.grid;
      }
      else if (this.snake.y >= this.canvas.height) {
        this.snake.y = 0;
      }
      // keep track of where snake has been. front of the array is always the head
      this.snake.cells.unshift({x: this.snake.x, y: this.snake.y});
      // remove cells as we move away from them
      if (this.snake.cells.length > this.snake.maxCells) {
        this.snake.cells.pop();
      }
      this.drawSnake();
  }
  move(message) {
      // left arrow key
      if (message === 'gauche' && this.snake.dx === 0) {
          this.snake.dx = -this.grid;
          this.snake.dy = 0;
      }
      // up arrow key
      else if (message === 'haut' && this.snake.dy === 0) {
          this.snake.dx = 0;
          this.snake.dy = -this.grid;
      }
      // right arrow key
      else if (message === 'droite' && this.snake.dx === 0) {
        this.snake.dx = this.grid;
        this.snake.dy = 0;
      }
      // down arrow key
      else if (message === 'bas' && this.snake.dy === 0) {
          this.snake.dx = 0;
          this.snake.dy = this.grid;
      }
      else if (message === 'reverse'){
          this.snake.cells.reverse();
          this.snake.x = this.snake.cells[0].x;
          this.snake.y = this.snake.cells[0].y;
          this.snake.dx = -this.snake.dx;
          this.snake.dy = -this.snake.dy;
      }
  }
  drawApple() {
      this.context.fillStyle = 'red';
      this.context.fillRect(this.apple.x, this.apple.y, this.grid-1, this.grid-1);
  }
  drawSnake() {
      // draw snake one cell at a time
      this.context.fillStyle = 'green';
      this.snake.cells.forEach(function(cell, index) {
        // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
        this.context.fillRect(cell.x, cell.y, this.grid-1, this.grid-1);  
        // snake ate apple
        if (cell.x === this.apple.x && cell.y === this.apple.y) {
          this.snake.maxCells++;
          this.score += 1;
          //saving score for next playing. 
          localStorage.setItem('game', JSON.stringify({
            score: Number(this.score)
          }));
          this.scoreElement.innerHTML = this.score;
          // canvas is 800x800 which is 25x25 grids 
          this.apple.x = getRandomInt(0, 25) * this.grid;
          this.apple.y = getRandomInt(0, 25) * this.grid;
        }
        // check collision with all cells after this one (modified bubble sort)
        for (var i = index + 1; i < this.snake.cells.length; i++)
        {
          // snake occupies same space as a body part. reset game
          if (cell.x === this.snake.cells[i].x && cell.y === this.snake.cells[i].y) { 
            if(this.score > this.max)
            {
                this.max = this.score;
            }
              this.resetSnake();
          }
      }
      }.bind(this)
      );
  }
  resetSnake() {
      this.snake.x = this.params.snake.x;
      this.snake.y = this.params.snake.y;
      this.snake.cells = this.params.snake.cells;
      this.snake.maxCells = this.params.snake.maxCells;
      this.snake.dx = this.params.snake.dx;
      this.snake.dy = this.params.snake.dy;
      this.apple.x = getRandomInt(0, 25) * this.grid;
      this.apple.y = getRandomInt(0, 25) * this.grid;
      this.highScoreElement.innerHTML = this.max;
  }

  getSpeed () {
    return this.snake.maxCells - this.params.snake.maxCells;
  }
}

const PARAMS = {
  grid: 32,
  apple: {
      x: 320,
      y: 320
  },
  snake: {
      x: 160,
      y: 160,
      dx: 32,
      dy: 0,
      cells: [],
      maxCells: 4
  },

}

const client = new tmi.Client({
  channels: ["bloubill"],
});

client.connect();

var canvas = document.getElementById('game');
const snake = new Snake(canvas, PARAMS);

function frame() {
  snake.loop();
  setTimeout(function() {
    requestAnimationFrame(frame);
  }, 225 - snake.getSpeed());
}

requestAnimationFrame(frame);

client.on("message", (channel, tags, message, self) => {
  if (self) return true;
  
  const allowedMessages = ["haut", "bas", "droite", "gauche", "reverse", "stop"];
  const msgWrapper = document.querySelector("#chat");
  const msgTemplate = document.querySelector("#chat-msg");

  const msgClone = msgTemplate.content.cloneNode(true);
  let msgText = msgClone.querySelector('.msg-text')
  let msgUserName = msgClone.querySelector(".msg-username");

  const regex = new RegExp(allowedMessages.join("|"), 'g');
  if (orderFound = message.toLowerCase().match(regex)[0]) { // Erreur retournée si pas de match si aucune correspondance.
    snake.move(orderFound);
    
    if (tags["emotes"]) {
      msgText.insertAdjacentHTML('beforeend', formatEmotes(message, tags["emotes"]));
    } else {
      msgText.textContent = message;
    }
    msgUserName.textContent = tags["display-name"];
    msgUserName.style.color = tags["color"];
  
    msgWrapper.prepend(msgClone);
  }
});

function formatEmotes(text, emotes) {
  var splitText = text.split('');
  for(var i in emotes) {
      var e = emotes[i];
      for(var j in e) {
          var mote = e[j];
          if(typeof mote == 'string') {
              mote = mote.split('-');
              mote = [parseInt(mote[0]), parseInt(mote[1])];
              var length =  mote[1] - mote[0],
                  empty = Array.apply(null, new Array(length + 1)).map(function() { return '' });
              splitText = splitText.slice(0, mote[0]).concat(empty).concat(splitText.slice(mote[1] + 1, splitText.length));
              splitText.splice(mote[0], 1, '<img class="emoticon" src="http://static-cdn.jtvnw.net/emoticons/v1/' + i + '/3.0">');
          }
      }
  }
  return splitText.join('');
}
