<template>
  <main>
    <div style="z-index: 100; pointer-events: none;" class="canvasContainer" ref="canvasContainer"></div>
    <div ref="imageContainer" class="imageContainer">
      <RouterLink class="image-link" ref="imageLink" style="z-index: 0; transform: translate(-1000px,-1000px); background-image: url('../../public/img/Flourish.jpg');" to="/f1"></RouterLink>
      <RouterLink class="image-link" ref="imageLink" style="z-index: 0; transform: translate(-1000px,-1000px); background-image: url('../../public/img/spotted mockup3.jpg');" to="/f1"></RouterLink>
      <RouterLink class="image-link" ref="imageLink" style="z-index: 0; transform: translate(-1000px,-1000px); background-image: url('../../public/img/yooyo2.jpg');" to="/f1"></RouterLink>
      <RouterLink class="image-link" ref="imageLink" style="z-index: 0; transform: translate(-1000px,-1000px); background-image: url('../../public/img/DSC01815-2.jpg');" to="/f1"></RouterLink>

      <!-- <RouterLink class="image-link" ref="imageLink" style="z-index: 0; transform: translate(-1000px,-1000px); background-image: url('../../public/img/Flourish.jpg');" to="/projects"></RouterLink>
      <RouterLink class="image-link" ref="imageLink" style="z-index: 0; transform: translate(-1000px,-1000px); background-image: url('../../public/img/spotted mockup3.jpg');" to="/projects"></RouterLink>
      <RouterLink class="image-link" ref="imageLink" style="z-index: 0; transform: translate(-1000px,-1000px); background-image: url('../../public/img/yooyo2.jpg');" to="/projects"></RouterLink>
      <RouterLink class="image-link" ref="imageLink" style="z-index: 0; transform: translate(-1000px,-1000px); background-image: url('../../public/img/DSC01815-2.jpg');" to="/projects"></RouterLink>
      <RouterLink class="image-link" ref="imageLink" style="z-index: 0; transform: translate(-1000px,-1000px); background-image: url('../../public/img/DSC01434.JPG');" to="/about"></RouterLink>

      <RouterLink class="image-link" ref="imageLink" style="z-index: 0; transform: translate(-1000px,-1000px); background-image: url('../../public/img/Flourish.jpg');" to="/projects"></RouterLink>
      <RouterLink class="image-link" ref="imageLink" style="z-index: 0; transform: translate(-1000px,-1000px); background-image: url('../../public/img/spotted mockup3.jpg');" to="/projects"></RouterLink>
      <RouterLink class="image-link" ref="imageLink" style="z-index: 0; transform: translate(-1000px,-1000px); background-image: url('../../public/img/yooyo2.jpg');" to="/projects"></RouterLink>
      <RouterLink class="image-link" ref="imageLink" style="z-index: 0; transform: translate(-1000px,-1000px); background-image: url('../../public/img/DSC01815-2.jpg');" to="/projects"></RouterLink>
      <RouterLink class="image-link" ref="imageLink" style="z-index: 0; transform: translate(-1000px,-1000px); background-image: url('../../public/img/DSC01434.JPG');" to="/about"></RouterLink>
     -->
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import p5 from 'p5';

const canvasContainer = ref(null);

onMounted(() => {
  const sketch = (p) => {
    let previousMouseX = 0;
    let previousMouseY = 0;
    const text = 'Wie können wir Räume in der Stadt neu gestalten? Mit dieser Frage haben sich Studierende des Masterstudiengangs Kommunikationsdesign der Hochschule Mainz beschäftigt. Dabei sind vier interaktive Stationen in der Mainzer Innenstadt entstanden, die vom 25. April bis zum 10. Mai 2024 erfahrbar sind. Wie können wir Räume in der Stadt neu gestalten? Mit dieser Frage haben sich Studierende des Masterstudiengangs Kommunikationsdesign der Hochschule Mainz beschäftigt. Dabei sind vier interaktive Stationen in der Mainzer Innenstadt entstanden, die vom 25. April bis zum 10. Mai 2024 erfahrbar sind.';
    let MouseDiff = 0;
    let counter = 0;
    let customFont;
    let i;

    p.preload = () => {
      customFont = p.loadFont('src/assets/fonts/ELMATRIO-REGULAR.OTF');
    };

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasContainer.value);
      p.textSize(32);
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

  new p5(sketch);
});
</script>

<script>
export default {
  data() {
    return {
      imageContainer: null,
      images: null,
      imageIndex: 0,
      lastMouseX: 0,
      lastMouseY: 0,
      mouseX: 0,
      mouseY: 0,
      distance: 0,
      zIndex: 0,
    };
  },
  mounted() {
    this.imageContainer = document.querySelector('.imageContainer');
    this.images = this.imageContainer.children;

    // Add a short delay before adding the event listener
    setTimeout(() => {
      window.addEventListener('mousemove', this.throttle(this.updateMousePosition, 100).bind(this));
    }, 500); // 500 ms delay
  },
  beforeUnmount() {
    window.removeEventListener('mousemove', this.updateMousePosition);
  },
  methods: {
    calculateDistance(mouseX, mouseY, lastMouseX, lastMouseY) {
      const deltaX = mouseX - lastMouseX;
      const deltaY = mouseY - lastMouseY;
      return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    },

    updateMousePosition(event) {
      // this.mouseX = event.clientX;
      // this.mouseY = event.clientY;
      // this.distance = this.calculateDistance(this.mouseX, this.mouseY, this.lastMouseX, this.lastMouseY);
      // if (this.distance > 10) {
      //   const image = this.images[this.imageIndex];
      //   const transform = `translate(calc(${event.clientX}px - 7rem), calc(${event.clientY}px - 7rem))`;
      //   if (image.style.transform !== transform) {
      //     image.style.transform = transform;
      //     image.style.zIndex = this.zIndex;
      //     image.classList.remove('animate');
      //     void image.offsetWidth; // Trigger reflow
      //     image.classList.add('animate');
      //   }
      //   this.lastMouseX = event.clientX;
      //   this.lastMouseY = event.clientY;
      //   this.imageIndex = (this.imageIndex + 1) % this.images.length;
      //   this.zIndex++;
      // }
        
        const image = this.images[this.imageIndex];
        const randomX = Math.random()*window.innerWidth;
        const randomY = Math.random()*window.innerHeight;
        if(this.calculateDistance(event.clientX,event.clientY,randomX,randomY) > 400){
        const transform = `translate(calc(${randomX}px - 7rem), calc(${randomY}px - 7rem))`;
        image.style.transform = transform;
        image.style.zIndex = this.zIndex;
        image.classList.remove('animate');
        void image.offsetWidth; // Trigger reflow
        image.classList.add('animate');
        this.imageIndex = (this.imageIndex + 1) % this.images.length;
        this.zIndex++;
      }
        
    },

    throttle(fn, wait) {
      let lastTime = 0;
      return function (...args) {
        const now = new Date().getTime();
        if (now - lastTime >= wait) {
          lastTime = now;
          return fn(...args);
        }
      };
    },
  },
};
</script>

<style scoped>
main {
  max-height: 100vh;
  min-height: 100vh;
  background-image: url(../../public/img/Niklas_Collage.mp4);
  background-size: cover;
  image-rendering: pixelated;
  margin: 0;
  padding: 0;
  display: grid;
  place-content: center;
  background-color: black;
  overflow: hidden;
  z-index: -100;
}
.image-link {
  height: 14rem;
  width: 14rem;
  display: block;
  position: fixed;
  background-size: 200%;
  background-position: center;
  z-index: 0;
  filter: brightness(0);
  opacity: 1;
  top: 0;
  left: 0;
}

.animate {
  animation: fadeaway 5s ease 0s 1;
}

@keyframes fadeaway {
  0% {
    filter: brightness(1);
    opacity: 0;
  }
   0% {
    filter: brightness(1);
    opacity: 1;
    /* filter: blur(0px); */
  }
  100% {
    filter: brightness(0);
    /* filter: blur(25px); */
  }
}

.intro-text {
  grid-column: 1/2;
  grid-row: 1/2;
  z-index: 100;
  color: white;
  text-align: center;
  font-family: 'Light';
  line-height: 1;
  word-break: break-word;
  transform: translateY(50%);
}

.video-container {
  height: 300px;
  width: 300px;
  position: relative;
}

main video {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  z-index: -100;
}
</style>
