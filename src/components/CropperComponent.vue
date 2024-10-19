<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import { StencilPreview, BoundingBox, DraggableArea } from 'vue-advanced-cropper'

// Props
const props = defineProps({
  image: Object,
  coordinates: Object,
  stencilCoordinates: Object,
  aspectRatio: Number,
  minAspectRatio: Number,
  maxAspectRatio: Number,
  transitions: Object
})

// Emits
const emit = defineEmits(['move', 'moveEnd', 'resize', 'resizeEnd'])

// Computed style
const style = computed(() => {
  const { height, width, left, top } = props.stencilCoordinates
  const style = {
    position: 'absolute',
    width: `${width}px`,
    height: `${height}px`,
    transform: `translate(${left}px, ${top}px)`
  }
  if (props.transitions && props.transitions.enabled) {
    style.transition = `${props.transitions.time}ms ${props.transitions.timingFunction}`
  }
  return style
})

// Methods
const onMove = (moveEvent) => {
  emit('move', moveEvent)
}

const onMoveEnd = () => {
  emit('moveEnd')
}

const onResize = (resizeEvent) => {
  emit('resize', resizeEvent)
}

const onResizeEnd = () => {
  emit('resizeEnd')
}

const aspectRatios = () => {
  return {
    minimum: props.aspectRatio || props.minAspectRatio,
    maximum: props.aspectRatio || props.maxAspectRatio
  }
}
</script>

<template>
  <div :style="style">
    <bounding-box @resize="onResize" @resize-end="onMoveEnd">
      <draggable-area @move="onMove" @move-end="onMoveEnd">
        <stencil-preview
          :image="image"
          :width="stencilCoordinates.width"
          :height="stencilCoordinates.height"
          :coordinates="coordinates"
          :transitions="transitions"
        />
      </draggable-area>
    </bounding-box>
  </div>
</template>

<style lang="scss" scoped></style>
