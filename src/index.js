import Phaser from "phaser";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import playGame from "./phaser/scene";

//console.log(App);

export const config = {
  type: Phaser.AUTO,
    parent: 'phaser',
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scale: {
        zoom: 2
    },
    scene: [playGame]
};

const game = new Phaser.Game(config);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
