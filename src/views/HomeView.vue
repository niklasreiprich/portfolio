<template>
  <main @mousemove="handleMouseMove">
    <Navigation />
    <div style="margin-top: 1rem; padding: var(--padding-vertical) var(--padding-horizonal)">
      <p style="grid-column: span 3; font-size: 6vh; line-height: 1.1;">Niklas Reiprich is a communication designer with a strong focus on type, graphic design and experimental design, currently based in Mainz, Germany. His work often engages with local cultural and environmental contexts, utilizing a diverse array of techniques to create unique and impactful designs.</p>

    </div>
    <p style="position: absolute; padding: var(--padding-vertical) var(--padding-horizonal); bottom: 0; left: 0; margin-bottom: 2rem; z-index: 1000"><a href="mailto:niklas@reiprich.com" style="font-family: 'Monospace'; font-size: 0.8em">mail: niklas@reiprich.com</a></p>

    <div id="image-container"></div>
    <Footer />
  </main>
</template>
<script>
import Navigation from '../components/Navigation.vue'
import Footer from '../components/Footer.vue'
import { mapStores } from "pinia";
import { useProjectsStore } from "@/stores/projects.js";

export default {
  name: "Startseite",
  components: {
    Navigation,
    Footer,
  },
  data() {
    return {
      projects: undefined,
      currentProjectIndex: 0,
      currentBackgroundImage: '',
      imageElements: [],
      lastMouseX: 0,
      lastMouseY: 0,
      lastImageX: 0,
      lastImageY: 0,
      distanceThreshold: 25, // Adjust this value to control the sensitivity
      allImages: [], // Aggregated list of all images
      preloadedImages: [], // Preloaded images
      noiseIndex: 0, // Index for noise-based size variation
      animationFrameId: null // To store the requestAnimationFrame ID
    }
  },
  computed: {
    ...mapStores(useProjectsStore),
    currentProject() {
      if (this.projects && this.projects.length > 0) {
        return this.projects[this.currentProjectIndex];
      }
      return {};
    }
  },
  mounted() {
    this.projects = this.projectsStore.projects;
    this.aggregateAllImages();
    this.startBackgroundImageRotation();
    this.preloadNextImages();
  },
  beforeDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  },
  methods: {
    navigateToRoute(route) {
      this.$router.push("projects/" + route);
    },
    startBackgroundImageRotation() {
      this.loadImage(this.currentProject.previewImage);
      setInterval(() => {
        this.currentProjectIndex = (this.currentProjectIndex + 1) % this.projects.length;
        this.loadImage("images/highres/" + this.currentProject.route + "/" + this.currentProject.previewImage);
      }, 1000); // 1000 Millisekunden = 1 Sekunde
    },
    loadImage(imageUrl) {
      const img = new Image();
      img.onload = () => {
        this.currentBackgroundImage = imageUrl;
      };
      img.src = `/${imageUrl}`;
    },
    aggregateAllImages() {
      this.projects.forEach(project => {
        project.images.forEach(image => {
          this.allImages.push({ image, route: project.route });
        });
      });
    },
    preloadNextImages() {
      this.preloadedImages = [];
      for (let i = 0; i < 10; i++) {
        const randomImage = this.allImages[Math.floor(Math.random() * this.allImages.length)];
        const img = new Image();
        img.src = `/images/lowres/${randomImage.route}/${randomImage.image}`;
        this.preloadedImages.push({ img, route: randomImage.route });
      }
    },
    handleMouseMove(event) {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
      this.animationFrameId = requestAnimationFrame(() => this.placeImage(event));
    },
    placeImage(event) {
      const distance = Math.sqrt(
        Math.pow(event.clientX - this.lastImageX, 2) + Math.pow(event.clientY - this.lastImageY, 2)
      );

      if (distance < this.distanceThreshold) {
        return;
      }

      this.lastMouseX = event.clientX;
      this.lastMouseY = event.clientY;
      this.lastImageX = event.clientX;
      this.lastImageY = event.clientY;

      const nextImage = this.preloadedImages.shift();
      const imageElement = nextImage.img;

      imageElement.style.position = 'absolute';
      imageElement.style.left = `${event.clientX}px`;
      imageElement.style.top = `${event.clientY}px`;
      imageElement.style.width = 'auto';
      imageElement.style.transform = 'translate(-50%, -50%)';
      imageElement.style.height = `${this.noiseBasedSize()}rem`;
      imageElement.style.transition = 'opacity 0.5s';
      imageElement.style.cursor = 'pointer';

      imageElement.addEventListener('click', () => {
        this.navigateToRoute(nextImage.route);
      });

      document.getElementById('image-container').appendChild(imageElement);
      this.imageElements.push(imageElement);

      setTimeout(() => {
        imageElement.style.opacity = '0';
        setTimeout(() => {
          imageElement.remove();
          this.imageElements = this.imageElements.filter(el => el !== imageElement);
        }, 500); // Match the transition duration
      }, 2000); // Time before starting to fade out

      // Preload the next image
      const randomImage = this.allImages[Math.floor(Math.random() * this.allImages.length)];
      const img = new Image();
      img.src = `/images/lowres/${randomImage.route}/${randomImage.image}`;
      this.preloadedImages.push({ img, route: randomImage.route });
    },
    noiseBasedSize() {
      const noiseValue = (Math.sin(this.noiseIndex / 10) + 1) / 2; // Simple sine wave for smooth variation
      this.noiseIndex++;
      return 2 + noiseValue * 4; // Scale size between 2rem and 6rem
    }
  }
}
</script>

<style scoped>
.text-image{height: 1em; transform: translateY(0.12em);padding: 0 0.08em}

body, html {
  height: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
