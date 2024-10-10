<template>
    <div ref="canvasContainer" class="canvasContainer"></div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import p5 from 'p5';
  
  export default {
    name: 'P5Canvas',
    setup() {
      const canvasContainer = ref(null);
  
      onMounted(() => {
        const sketch = (p) => {
          let previousMouseX = 0;
          let previousMouseY = 0;
          const text = 'A place to dump my small but still beloved fiddles, scribbles, and jumbles.';
          let MouseDiff = 0;
          let counter = 0;
          let customFont;
  
          p.preload = () => {
            customFont = p.loadFont('src/assets/fonts/Januarv21-Regular.otf');
          };
  
          p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasContainer.value);
            p.textSize(16);
            p.fill(255);
            p.textAlign(p.CENTER, p.CENTER);
            p.textFont(customFont);
          };
  
          p.draw = () => {
            MouseDiff = p.dist(previousMouseX, previousMouseY, p.mouseX, p.mouseY);
  
            if (MouseDiff > 15) {
              let angle = p.atan2(p.mouseY - previousMouseY, p.mouseX - previousMouseX);
              p.push();
              p.translate(p.mouseX, p.mouseY);
              p.rotate(angle);
              p.text(text.charAt(counter % text.length), 0, 0);
              p.pop();
  
              previousMouseX = p.mouseX;
              previousMouseY = p.mouseY;
              counter++;
            }
          };
  
          p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
          };
        };
  
        new p5(sketch, canvasContainer.value);
      });
  
      return {
        canvasContainer,
      };
    },
  };
  </script>
  
  <style scoped>
  .canvasContainer {
    position: fixed;
    top: 0;
    z-index: 10;
  }
  </style>
  