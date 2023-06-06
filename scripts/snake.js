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

class Grid {

  size = 32;

  constructor(cells = []) {
    this.occupiedCells = cells;
  }

  fillCell(x, y) {
    this.occupiedCells.push({x: x, y: y});
  }

  clearCells() {
    this.occupiedCells = [];  
  }

  getCells() {
    return this.occupiedCells;
  }
  
  getSize() {
    return this.size
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

  constructor(canvas) {
    this.traps = [];
    this.eatables = [];
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.highScoreElement = document.getElementById('high'),
    this.scoreElement = document.getElementById('score'),
    this.storage = new Storage(this, 'game');
    this.lastGame = this.storage.load();
    if (this.lastGame.score) {
      this.grid = new Grid(this.lastGame.grid.occupiedCells);
      this.snake = new Snake(canvas, this.lastGame.snake, this.grid);
      this.lastGame.eatables.forEach(function(eatable) {
        this.eatables.push(new Eatable(canvas, this.grid, eatable.type, true, {x: eatable.x, y: eatable.y}));
      }.bind(this))
      this.highScoreElement.innerHTML = this.lastGame.highScore;
      this.scoreElement.innerHTML = this.lastGame.score;
      this.score = this.lastGame.score
      this.highScore = this.lastGame.highScore
    } else {
      this.grid = new Grid();
      this.eatables.push(new Eatable(canvas, this.grid, 'apple'));
      this.snake = new Snake(canvas, this.getParams(), this.grid)
    }
  }

  loop(){
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.snake.draw();
    // Create new object
    if (this.score % 2 === 0 && this.eatables.length < Math.ceil(this.score / 2)) {
      this.eatables.push(new Eatable(this.canvas, this.grid));
    }
    if (this.eatables.length > 0) {
      this.eatables.forEach(function(eatable) {
        eatable.draw();
      });
    }
    this.snake.cells.forEach(function(cell, index) {
      // check collision with all cells after this one (modified bubble sort)
      for (let i = index + 1; i < this.snake.cells.length; i++)
      {
        // snake collides with object
        this.eatables.forEach(function(eatable) {
          if (cell.x === eatable.x && cell.y === eatable.y) {
            eatable.new();
            this.addPoint(eatable.doEffect(this.snake));
          }
        }.bind(this));
        // snake occupies same space as a body part. reset game
        if (i in this.snake.cells) {
          if (cell.x === this.snake.cells[i].x && cell.y === this.snake.cells[i].y) { 
              this.reset();
          }
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
    this.grid.clearCells();
    this.snake.setParams(this.snakeParams);
    this.fruit.new();
    this.score = 0;
    this.scoreElement.innerHTML = 0;
    this.storage.clear();
  }
}

class Eatable {
  constructor (canvas, grid, type = '', saved = false, position) {
    this.context = canvas.getContext('2d');
    this.grid = grid;
    this.type = type ? type : this.getType(); 
    this.points = 0;
    if (saved) {
      this.setPosition(position.x, position.y);
    } else {
      this.new();
    }
  }
  
  new() {
    let occupiedCells = this.grid.getCells();
    this.x = getRandomInt(0, 25) * this.grid.getSize();
    this.y = getRandomInt(0, 25) * this.grid.getSize();
    if (occupiedCells.includes({x: this.x, y: this.y})) {
      this.new();
    } else {
      this.grid.fillCell(this.x, this.y);
    }
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  doEffect(snake) {
    switch (this.type) {
      case 'teleport':
        return this.teleport(snake);
      case 'speed_change':
        return this.speedChange(snake);
      case 'golden_apple':
        return this.goldenApple(snake);
      case 'green_apple':
        return this.greenApple(snake);
      default:
        return this.apple(snake);
    };
  }

  teleport(snake){
    snake.cells = [];
    console.log('teleport');
    snake.x = getRandomInt(0, 25) * this.grid.getSize();
    snake.y = getRandomInt(0, 25) * this.grid.getSize();
    snake.cells.push({x: snake.x, y: snake.y});
    return this.points;
  }

  apple(snake) {
    this.points = 1;
    snake.grow(this.points);
    return this.points;
  }

  greenApple(snake) {
    console.log('green apple');
    this.points = -1;
    snake.grow(this.points);
    return this.points;
  }

  goldenApple(snake) {
    console.log('golden apple');
    this.points = getRandomInt(2, 5);
    snake.grow(this.points);
    return this.points;
  }

  speedChange(snake) {
    console.log('speed change');
    let bool = getRandomInt(0, 1);
    snake.setSpeedModifier((bool) ? 5 : -5);
    return this.points;
  }

  getType() {
    var type = getRandomInt(0, 3);
    switch (type) {
      case 0:
        return 'teleport';
      case 1:
        return 'speed_change';
      case 2:
        return 'golden_apple';
      default:
        return 'green_apple';
    }
  }

  draw() {
    this.context.fillStyle = this.type === 'apple' ? 'red' : 'blue';
    this.context.fillRect(this.x, this.y, this.grid.getSize()-1, this.grid.getSize()-1);
  }
}

class Snake {
  constructor(canvas, params, grid) {
      this.canvas = canvas;
      this.speedModifier = 0;
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
      this.context.fillRect(cell.x, cell.y, this.grid.getSize()-1, this.grid.getSize()-1);  
      
    }.bind(this));
}
  move() {
      // move snake by it's velocity
      this.x += this.dx;
      this.y += this.dy;
      // wrap snake position horizontally on edge of screen
      if (this.x < 0) {
        this.x = this.canvas.width - this.grid.getSize();
      }
      else if (this.x >= this.canvas.width) {
        this.x = 0;
      }
       // wrap snake position vertically on edge of screen
      if (this.y < 0) {
        this.y = this.canvas.height - this.grid.getSize();
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
          this.dx = -this.grid.getSize();
          this.dy = 0;
      }
      // up arrow key
      else if (message === 'haut' && this.dy === 0) {
          this.dx = 0;
          this.dy = -this.grid.getSize();
      }
      // right arrow key
      else if (message === 'droite' && this.dx === 0) {
        this.dx = this.grid.getSize();
        this.dy = 0;
      }
      // down arrow key
      else if (message === 'bas' && this.dy === 0) {
          this.dx = 0;
          this.dy = this.grid.getSize();
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
    return this.maxCells + this.speedModifier;
  }

  setSpeedModifier(speed) {
    this.speedModifier = speed;
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
  if (tags["display-name"] === "Moobot") return true; 
  
  const allowedMessages = ["haut", "bas", "droite", "gauche", "arriere", "stop"];
  const msgWrapper = document.querySelector("#chat");
  const msgTemplate = document.querySelector("#chat-msg");

  const msgClone = msgTemplate.content.cloneNode(true);
  let msgText = msgClone.querySelector('.msg-text')
  let msgUserName = msgClone.querySelector(".msg-username");

  
  /*
  const regex = new RegExp(allowedMessages.join("|"), 'g');
  if (orderFound = message.toLowerCase().match(regex)[0]) { // Erreur retournée si pas de match si aucune correspondance.
    game.snake.updateDirection(orderFound);
  */
  const lowerCaseMessage = message.toLowerCase().split(/\b/) // \b is for word border so it splits on words end
  const trueMessage = allowedMessages.find(allowedMessage => lowerCaseMessage.includes(allowedMessage))
  if (trueMessage === undefined) return true;
  
  game.snake.updateDirection(trueMessage);
  if (tags["emotes"]) {
    msgText.insertAdjacentHTML('beforeend', formatEmotes(message, tags["emotes"]));
  } else {
    msgText.textContent = message;
  }
  msgUserName.textContent = tags["display-name"];
  msgUserName.style.color = tags["color"];

  msgWrapper.prepend(msgClone);
});

function formatEmotes(text, emotes) {
  let splitText = text.split('');
  for(let i in emotes) {
    let e = emotes[i];
    for(let j in e) {
      let mote = e[j];
      if(typeof mote == 'string') {
        // const [mote, motebis] = mote.split('-).slice(0, 2).map(m => parseInt(m, 10))
        mote = mote.split('-');
        mote = [parseInt(mote[0]), parseInt(mote[1])];
        // const length = motebis - mote
        let length =  mote[1] - mote[0];
        // const empty = Array(length + 1).fill('')
        let empty = Array.apply(null, new Array(length + 1)).map(function() { return '' });
        //
        splitText = splitText.slice(0, mote[0]).concat(empty).concat(splitText.slice(mote[1] + 1, splitText.length));
        splitText.splice(mote[0], 1, '<img class="emoticon" src="http://static-cdn.jtvnw.net/emoticons/v1/' + i + '/3.0">');
      }
    }
  }
  return splitText.join('');
}
