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

  clear() {
    localStorage.removeItem(this.localName);
  }
}

class Game {
  score = 0;
  highScore = 0;

  snakeParams = {
    x: 160,
    y: 160,
    dx: 32,
    dy: 0,
    cells: [],
    maxCells: 4
  };

  grid = 32;

  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.highScoreElement = document.getElementById('high'),
    this.scoreElement = document.getElementById('score'),
    this.storage = new Storage(this, 'game');
    this.lastGame = this.storage.load();
    this.fruit = new Fruit(canvas, this.grid);
    if (this.lastGame) {
      this.snake = new Snake(canvas, this.lastGame.snake, this.grid);
      this.fruit.new();
      this.highScoreElement.innerHTML = this.lastGame.highScore;
      this.scoreElement.innerHTML = this.lastGame.score;
    } else {
      this.snake = new Snake(canvas, this.getParams(), this.grid)
    }
  }

  loop(){
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.snake.draw();
    this.fruit.draw();
    this.snake.cells.forEach(function(cell, index) {
      // check collision with all cells after this one (modified bubble sort)
      for (var i = index + 1; i < this.snake.cells.length; i++)
      {
        // snake ate apple
        if (cell.x === this.fruit.x && cell.y === this.fruit.y) {
          this.snake.grow(1);
          this.addPoint(1);
          this.fruit.new();
        }
        // snake occupies same space as a body part. reset game
        if (cell.x === this.snake.cells[i].x && cell.y === this.snake.cells[i].y) { 
            this.reset();
        }
      }
    }.bind(this));
  }

  addPoint(point) {
    this.score += point;
    this.scoreElement.innerHTML = this.score
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.highScoreElement.innerHTML = this.highScore
      this.storage.save(this);
    }
  }

  getParams() {
    if (this.lastGame.snakeParams ) {
      return this.lastGame.snakeParams;
    }
    return this.snakeParams;
  }

  reset() {
    this.snake.setParams(this.snakeParams);
    this.fruit.new();
    this.score = 0;
    this.scoreElement.innerHTML = 0;
    this.storage.clear();
  }
}

class Fruit {

  x = 320;
  y = 320;

  constructor(canvas, grid) {
    this.context = canvas.getContext('2d');
    this.grid = grid;
  }
  
  setPosition(params) {
    this.x = params.x;
    this.y = params.y;
  }

  draw() {
    this.context.fillStyle = 'red';
    this.context.fillRect(this.x, this.y, this.grid-1, this.grid-1);
  }

  new() {
    this.x = getRandomInt(0, 25) * this.grid;
    this.y = getRandomInt(0, 25) * this.grid;
  }
}

class Snake {
  constructor(canvas, params, grid) {
      this.canvas = canvas;
      this.context = canvas.getContext('2d');
      this.grid = grid;
      this.setParams(params);
    }
    
    setParams(params) {
      this.x = params.x;
      this.y = params.y;
      this.dx = params.dx;
      this.dy = params.dy;
      this.cells = [...params.cells];
      this.maxCells = params.maxCells;
  }

  draw() {
    this.move();
    // draw snake one cell at a time
    this.context.fillStyle = 'green';
    this.cells.forEach(function(cell) {
      // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
      this.context.fillRect(cell.x, cell.y, this.grid-1, this.grid-1);  
      
    }.bind(this));
}
  move() {
      // move snake by it's velocity
      this.x += this.dx;
      this.y += this.dy;
      // wrap snake position horizontally on edge of screen
      if (this.x < 0) {
        this.x = this.canvas.width - this.grid;
      }
      else if (this.x >= this.canvas.width) {
        this.x = 0;
      }
       // wrap snake position vertically on edge of screen
      if (this.y < 0) {
        this.y = this.canvas.height - this.grid;
      }
      else if (this.y >= this.canvas.height) {
        this.y = 0;
      }
      // keep track of where snake has been. front of the array is always the head
      this.cells.unshift({x: this.x, y: this.y});
      // remove cells as we move away from them
      if (this.cells.length > this.maxCells) {
        this.cells.pop();
      }
  }
  updateDirection(message) {
      // left arrow key
      if (message === 'gauche' && this.dx === 0) {
          this.dx = -this.grid;
          this.dy = 0;
      }
      // up arrow key
      else if (message === 'haut' && this.dy === 0) {
          this.dx = 0;
          this.dy = -this.grid;
      }
      // right arrow key
      else if (message === 'droite' && this.dx === 0) {
        this.dx = this.grid;
        this.dy = 0;
      }
      // down arrow key
      else if (message === 'bas' && this.dy === 0) {
          this.dx = 0;
          this.dy = this.grid;
      }
      else if (message === 'arriere'){
          this.cells.reverse();
          this.x = this.cells[0].x;
          this.y = this.cells[0].y;
          this.dx = -this.dx;
          this.dy = -this.dy;
      }
  }

  grow(growth) {
    this.maxCells += growth;
  }

  getSpeed () {
    return this.maxCells;
  }
}

const client = new tmi.Client({
  channels: ["bloubill"],
});

client.connect();

var canvas = document.getElementById('game');
const game = new Game(canvas);

function frame() {
  game.loop();
  setTimeout(function() {
    requestAnimationFrame(frame);
  }, 225 - game.snake.getSpeed());
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
    game.snake.updateDirection(orderFound);
    
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
