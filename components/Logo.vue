<template>
  <div class="scene">
    <div class="cube">
      <div class="cube__face cube__face--left" />
      <div class="cube__face cube__face--right" />
      <div class="cube__face cube__face--top" />
      <div class="cube__face cube__face--bottom" />
      <div class="cube__face cube__face--front" />
      <div class="cube__face cube__face--back" />
    </div>
  </div>
</template>

<style>

.scene {
  height: 100%;
  perspective: 800px;
  display: inline;
  float: left;
  justify-content:  left;
  align-items: left;
  margin-right: 50px;
  margin-top: 24px;
}

.cube {
   position: relative;
   width: 64px;
   height: 64px;
   transform-style: preserve-3d;
   animation: rotation 10s infinite alternate;
}

@keyframes rotation {
  0% { transform: rotateY(0deg) rotateX(0deg); }
  100% { transform: rotateY(720deg) rotateX(60deg); }
}

.cube__face {
  position: absolute;
  width: 64px;
  height: 64px;
  opacity: 0.8;
}

.cube__face--left {
  background-image: url('../static/img/grasscube/side.jpg');
  transform: translateX(-32px) rotateY(90deg);
}

.cube__face--right {
  background-image: url('../static/img/grasscube/side.jpg');
  transform: translateX(32px) rotateY(90deg);
}

.cube__face--bottom {
  background-image: url('../static/img/grasscube/bottom.jpg');
  transform: translateY(32px) rotateX(90deg);
}

.cube__face--top {
   background-image: url('../static/img/grasscube/top.jpg');
  transform: translateY(-32px) rotateX(90deg);
}

.cube__face--back {
  background-image: url('../static/img/grasscube/side.jpg');
  transform: translateZ(-32px);
}

.cube__face--front {
  background-image: url('../static/img/grasscube/side.jpg');
  transform: translateZ(32px);
}
</style>
