"use strict";

var ASTEROIDS = ASTEROIDS || {};
var model = ASTEROIDS.model = {};

model.randomCoord = function(max) {
  return Math.random() * max;
};

model.boardSize = {
  top: 0,
  right: 600,
  bottom: 500,
  left: 0
};

model.fps = 30;

model.maxSpeed = model.boardSize.bottom / model.fps;

model.Asteroid = function() {
  this.coords = {
    x: model.randomCoord(model.boardSize.right),
    y: model.randomCoord(model.boardSize.bottom)
  };
  this.vel = {
    x: model.randomCoord(model.maxSpeed),
    y: model.randomCoord(model.maxSpeed)
  };
  model.asteroids.push(this);
};

model.Asteroid.prototype.tic = function() {
  this.coords.x += this.vel.x;
  this.coords.y += this.vel.y;
};

model.asteroids = [];

model.tic = function() {
  for (var i = 0; i < model.asteroids.length; i++) {
    model.asteroids[i].tic();
  }
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
  console.log(animateMsg)
};
