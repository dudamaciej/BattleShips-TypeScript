!function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";t.__esModule=!0,new(r(1).default)},function(e,t,r){"use strict";t.__esModule=!0;var n=r(2),i=function(){function e(){this.playerBoard=document.querySelector("#playerBoard"),this.enemyBoard=document.querySelector("#enemyBoard"),this.fleetGarage=document.querySelector(".shipGarage"),this.fleetSize=5,this.playerBattleField=[],this.enemyBattleField=[],this.player="player",this.enemy="enemy",this.createBoard(this.playerBoard,this.playerBattleField,this.player),this.createBoard(this.enemyBoard,this.enemyBattleField,this.enemy),this.createFleetGarage(this.fleetGarage)}return e.prototype.createBoard=function(e,t,r){for(var i=0;i<10;i++)for(var o=0;o<10;o++){var a=new n.default(i,o),l=document.createElement("div");l.classList.add("singleField");var u=50*o,s=50*i;l.id=""+r+o+i,l.style.top=u+"px",l.style.left=s+"px",e.appendChild(l),t.push(a)}console.log(t)},e.prototype.createFleetGarage=function(e){for(var t=1;t<=this.fleetSize+1;t++){var r=document.createElement("div");r.classList.add("singleGarageSpot"),this.createShipInGarage(t,r),e.appendChild(r)}},e.prototype.createShipInGarage=function(e,t){var r=document.querySelector("div");r.classList.add("shipDiv");for(var n=0;n<e;n++){var i=document.querySelector("div");i.classList.add("partOfShip"),i.style.top="0px",i.style.left=30*n+"px",r.appendChild(i)}t.appendChild(r)},e}();t.default=i},function(e,t,r){"use strict";t.__esModule=!0;var n=function(){function e(e,t){this.x=e,this.y=t,this.isHit=!1}return e.prototype.getX=function(){return this.x},e.prototype.getY=function(){return this.y},e.prototype.takeHit=function(){this.isHit=!0},e.prototype.isItHit=function(){return this.isHit},e}();t.default=n}]);