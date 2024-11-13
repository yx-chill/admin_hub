<script setup></script>

<template>
  <div class="bg">
    <div class="bg-1"></div>
    <div class="bg-2"></div>
    <div class="bg-3"></div>
    <div class="bg-4"></div>
    <div class="bg-5"></div>
  </div>
</template>

<style lang="scss" setup>
.bg {
  --gradient-opacity: 0.85;
  --ray-gradient: radial-gradient(
    rgba(83, 196, 255, var(--gradient-opacity)) 0%,
    rgba(43, 166, 255, 0) 100%
  );
  transition: opacity 0.25s linear;
  position: fixed;
  inset: 0;
  pointer-events: none;
  user-select: none;

  & > div {
    position: absolute;
    border-radius: 100%;
    background: var(--ray-gradient);
  }

  .bg-1 {
    width: 480px;
    height: 680px;
    transform: rotate(80deg);
    top: -540px;
    left: 250px;
    filter: blur(110px);
  }

  .bg-2 {
    width: 110px;
    height: 400px;
    transform: rotate(-20deg);
    top: -280px;
    left: 350px;
    mix-blend-mode: overlay;
    opacity: 0.6;
    filter: blur(60px);
  }

  .bg-3 {
    width: 400px;
    height: 370px;
    top: -350px;
    left: 200px;
    mix-blend-mode: overlay;
    opacity: 0.6;
    filter: blur(21px);
  }

  .bg-4 {
    position: absolute;
    width: 330px;
    height: 370px;
    top: -330px;
    left: 50px;
    mix-blend-mode: overlay;
    opacity: 0.5;
    filter: blur(21px);
  }

  .bg-5 {
    position: absolute;
    width: 110px;
    height: 400px;
    transform: rotate(-40deg);
    top: -280px;
    left: -10px;
    mix-blend-mode: overlay;
    opacity: 0.8;
    filter: blur(60px);
  }
}
</style>
