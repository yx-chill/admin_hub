<script setup>
import { onMounted } from 'vue'

const MIN_SPEED = 0.5
const MAX_SPEED = 2

function randomNumber(min, max) {
  return Math.random() * (max - min) + min
}

class Blob {
  constructor(el) {
    this.el = el
    const boundingRect = this.el.getBoundingClientRect()
    this.size = boundingRect.width
    // 隨機初始位置
    this.initialX = randomNumber(0, window.innerWidth - this.size)
    this.initialY = randomNumber(0, window.innerHeight - this.size)
    this.el.style.top = `${this.initialY}px`
    this.el.style.left = `${this.initialX}px`
    // 速度
    this.vx = randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1)
    this.vy = randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1)
    this.x = this.initialX
    this.y = this.initialY
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    if (this.x >= window.innerWidth - this.size) {
      this.x = window.innerWidth - this.size
      this.vx *= -1
    }
    if (this.y >= window.innerHeight - this.size) {
      this.y = window.innerHeight - this.size
      this.vy *= -1
    }
    if (this.x <= 0) {
      this.x = 0
      this.vx *= -1
    }
    if (this.y <= 0) {
      this.y = 0
      this.vy *= -1
    }

    this.el.style.transform = `translate(${this.x - this.initialX}px, ${this.y - this.initialY}px)`
  }
}

function initBlobs() {
  const blobEls = document.querySelectorAll('.blob')
  const blobs = Array.from(blobEls).map((blobEl) => new Blob(blobEl))

  function update() {
    requestAnimationFrame(update)
    blobs.forEach((blob) => blob.update())
  }
  requestAnimationFrame(update)
}

onMounted(() => {
  initBlobs()
})
</script>

<template>
  <div class="blobs">
    <div class="blob"></div>
    <div class="blob"></div>
    <div class="blob"></div>
    <div class="blob"></div>
    <div class="blob"></div>
    <div class="blob"></div>
    <div class="blob"></div>
  </div>
</template>

<style lang="scss" setup>
:root {
  --cr-main-1: #2ac9de;
  --cr-main-2: #f087f4;
  --cr-1: color-mix(in srgb, var(--cr-main-1), var(--cr-main-2) 20%);
  --cr-2: color-mix(in srgb, var(--cr-main-1), var(--cr-main-2) 35%);
  --cr-3: color-mix(in srgb, var(--cr-main-1), var(--cr-main-2) 50%);
  --cr-4: color-mix(in srgb, var(--cr-main-1), var(--cr-main-2) 65%);
  --cr-5: color-mix(in srgb, var(--cr-main-1), var(--cr-main-2) 80%);
}

[color-scheme='dark'] {
  .blobs {
    opacity: 0.25;
  }
}

.blobs {
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  filter: blur(140px);
  opacity: 0.4;
}

.blob {
  width: max(240px, 20vw);
  aspect-ratio: 1;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
}

.blob:nth-of-type(1) {
  background: var(--cr-main-1);
}
.blob:nth-of-type(2) {
  background: var(--cr-main-2);
}
.blob:nth-of-type(3) {
  background: var(--cr-1);
}
.blob:nth-of-type(4) {
  background: whitesmoke;
}
.blob:nth-of-type(5) {
  background: var(--cr-3);
}
.blob:nth-of-type(6) {
  background: var(--cr-4);
}
.blob:nth-of-type(7) {
  background: var(--cr-2);
}
</style>
