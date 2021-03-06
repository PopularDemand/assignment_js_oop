"use strict";

var ASTEROIDS = ASTEROIDS || {};
var view = ASTEROIDS.view = {};

view.init = function(modelAsteroids, modelShip, handlers) {
  view.two = new Two({
    width: ASTEROIDS.boardEdges.right,
    height: ASTEROIDS.boardEdges.bottom
  });
  var canvas = document.getElementById('canvas');
  view.two.appendTo(canvas);
  for (var i = 0; i < modelAsteroids.length; i++) {
    view.createAsteroid(modelAsteroids[i]);
  }
  view.ship = view.createShip(modelShip);
  view.setupHandlers(handlers);
};

view.setupHandlers = function(handlers) {
  $(document).on('keydown', function(e) {
    console.log(e.which);
    if (e.which === 37) { // left
      handlers.rotateShip("left");
    }
    if (e.which === 39) { // right
      handlers.rotateShip("right");
    }
    if (e.which === 38) {
      handlers.accelerateShip();
    }
  });
};

view.asteroids = [];

view.createAsteroid = function(modelAsteroid) {
  var viewAsteroid = view.two.makeCircle(modelAsteroid.coords.x, modelAsteroid.coords.y, modelAsteroid.radius);
  viewAsteroid.model = modelAsteroid;
  view.two.update();
  view.asteroids.push(viewAsteroid);
};

view.moveAsteroid = function(viewAsteroid) {
  var modelCoords = viewAsteroid.model.coords;
  viewAsteroid.translation.x = modelCoords.x;
  viewAsteroid.translation.y = modelCoords.y;
};

view.createShip = function(modelShip) {
  var viewShip = view.two.makeCircle(modelShip.coords.x, modelShip.coords.y, modelShip.radius);
  viewShip.fill = 'magenta';

  var muzzle = view.two.makeRectangle(modelShip.coords.x,
    modelShip.coords.y - modelShip.radius,
    10, 3);
  muzzle.fill = '#4285F4';

  var leftFin = view.two.makePolygon(modelShip.coords.x - modelShip.radius + 3, modelShip.coords.y + modelShip.radius - 2, 5);
  leftFin.rotation = -Math.PI/8;
  leftFin.fill = 'magenta';

  var rightFin = view.two.makePolygon(modelShip.coords.x + modelShip.radius - 3, modelShip.coords.y + modelShip.radius - 2, 5);
  rightFin.rotation = Math.PI/8;
  rightFin.fill = 'magenta';

  var shipGroup = view.two.makeGroup();
  shipGroup.add(viewShip);
  shipGroup.add(muzzle);
  shipGroup.add(leftFin);
  shipGroup.add(rightFin);
  shipGroup.center();
  shipGroup.translation.x = modelShip.coords.x;
  shipGroup.translation.y = modelShip.coords.y;

  return shipGroup;
};

view.rotateShip = function(rotation) {
  view.ship.rotation = rotation;
};

view.moveShip = function(modelShip) {
  view.ship.translation.x = modelShip.coords.x;
  view.ship.translation.y = modelShip.coords.y;
};


// var circle = view.two.makeCircle(72, 100, 50);
// var rect = view.two.makeRectangle(213, 100, 100, 100);
//
// // The object returned has many stylable properties:
// circle.fill = '#FF8000';
// circle.stroke = 'orangered'; // Accepts all valid css color
// circle.linewidth = 5;
//
// rect.fill = 'rgb(0, 200, 255)';
// rect.opacity = 0.75;
// rect.noStroke();
//
// // Don't forget to tell two to render everything
// // to the screen
// view.two.update();
