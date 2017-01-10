"use strict";

var ASTEROIDS = ASTEROIDS || {};
var model = ASTEROIDS.model = {};

model.randomCoord = function(max, min = 0) {
  return Math.random() * (max - min) + min;
};
model.randomVelocity = function(max) {
  var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  return Math.random() * plusOrMinus * max;
};

model.FPS = 60;
model.ASTEROID_MAX_SIZE = 50;
model.ASTEROID_MIN_SIZE = model.ASTEROID_MAX_SIZE / 4;
model.MAX_SPEED = ASTEROIDS.boardEdges.bottom / model.FPS / 5;
model.SHIP_SIZE = 15;

// Constructors

model.Ship = function() {
  this.coords = {
    x: ASTEROIDS.boardEdges.right / 2,
    y: ASTEROIDS.boardEdges.bottom / 2
  };

  this.vel = {
    x: 0,
    y: 0
  },

  this.radius = model.SHIP_SIZE;
};

model.Asteroid = function() {
  this.coords = {
    x: model.randomCoord(ASTEROIDS.boardEdges.right),
    y: model.randomCoord(ASTEROIDS.boardEdges.bottom)
  };
  this.vel = {
    x: model.randomVelocity(model.MAX_SPEED),
    y: model.randomVelocity(model.MAX_SPEED)
  };
  this.radius = model.randomCoord(model.ASTEROID_MAX_SIZE, model.ASTEROID_MIN_SIZE);

  model.asteroids.push(this);
};


model.Asteroid.prototype.tic = function() {
  this.coords.x += this.vel.x;
  this.coords.y += this.vel.y;

  this.coords.x = model.edgeWrap(this.coords.x, ASTEROIDS.boardEdges.right, this.radius);
  this.coords.y = model.edgeWrap(this.coords.y, ASTEROIDS.boardEdges.bottom, this.radius);

};


// Methods

model.tic = function() {
  for (var i = 0; i < model.asteroids.length; i++) {
    model.asteroids[i].tic();
  }
};

model.edgeWrap = function(coord, edge, radius) {
  if (coord > edge + radius) {
    coord = 0 - radius;
  }
  if (coord < 0 - radius) {
    coord = edge + radius;
  }
  return coord;
};

// Init

model.init = function(count) {
  this.asteroids = [];
  for (var i = 0; i < count; i++) {
    new model.Asteroid();
  }
  this.ship = new model.Ship();
};

model.benchmark = function(times) {
  var startTime = new Date();
  for (var i = 0; i < times; i++) {
    new model.Asteroid();
  }
  var afterAsteroidTime = new Date();
  for (var j = 0; j < times; j++) {
    model.tic();
  }
  var endTime = new Date();

  var asteroidMsg = `The time to make asteroids: ${afterAsteroidTime - startTime}`;
  var animateMsg = `The time to animate asteroids: ${endTime - startTime}`;
  console.log(asteroidMsg);
  console.log(animateMsg);
};
