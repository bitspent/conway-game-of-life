### - [HEROKU ONE CLICK DEPLOY](https://www.heroku.com/deploy/?template=https://github.com/nnmix/conway-game-of-life)

### - [LIVE DEMO](https://conway--game-of-life.herokuapp.com/)

### MANUAL DEPLOY

make sure you have node on your system, clone the repo or unzip the downoaded package

> cd (to the project directory)
  
> npm install

> npm start

accessible locally by default on http://localhost:5000


# Conway Game Of Life - Multisession Rules

All Players share the same world, seed and creation within a specific color

Creating / Overriding existing (others) cell is no allowed

You can see only on empty location within your own color!

# Game Of Life Rules

Any live cell with fewer than two live neighbours dies, as if caused by under-population.

Any live cell with two or three live neighbours lives on to the next generation.

Any live cell with more than three live neighbours dies, as if by over-population.

Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

Conway's Game of Life — Wikipedia
