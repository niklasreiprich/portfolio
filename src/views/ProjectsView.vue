<template>
  <main>
    <Navigation />
    <div style="padding: 1rem; padding-bottom: 0rem;">
      <h1 style="padding-bottom: 0rem">Work</h1>
    </div>
    <div class="filter">
      <div id="category-filter" class="filter-boxes">
        <div 
          v-for="category in categories" 
          :key="category" 
          @click="selectCategory(category)"
          :class="{'filter-box': true, 'selected': category === selectedCategory}"
        >
          {{ category }}
        </div>
      </div>
    </div>
    
    <div class="grid">
      <TransitionGroup name="list">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          @click="navigateToRoute(project.route)"
          @mouseover="showTitle(project.title, project.color)"
          @mousemove="handleMouseMove"
          @mouseleave="hideTitle"
        
        >
        <div
        class="lazyload projectImage"

        :class="project.category"
          :style="{ 
            backgroundImage: loadedImages.has(project.previewImage) ? `url('images/highres/${project.route}/${project.previewImage}')` : `url('images/lowres/${project.route}/${project.previewImage}')`,
            '--bg-color': project.color // Set CSS variable for background color
          }"
          @lazyloaded="markAsLoaded(project.previewImage)"
          style="height: 100%; background-size: cover;"
          ></div>
          <div class="projectText">
            <p style="">{{project.title}}</p>
            <p style="">{{project.year}}</p>
          </div>

        </div>
      </TransitionGroup>
    </div>

    <div class="floating-title" v-if="titleVisible" :style="{ top: titlePosition.y + 'px', left: titlePosition.x + 'px',  }">
      <span class="arrow">↗</span>  {{ currentTitle }}
    </div>
    <Footer class="custom-footer" />
  </main>
</template>

<script>
import Navigation from '../components/Navigation.vue';
import Footer from '../components/Footer.vue';
import { mapStores } from 'pinia';
import { useProjectsStore } from '@/stores/projects.js';

export default {
  name: 'Startseite',
  components: {
    Navigation,
    Footer,
  },
  data() {
    return {
      projects: undefined,
      selectedCategory: 'Alle', // Default value for filtering
      uniqueCategories: undefined,
      titleVisible: false,
      currentTitle: '',
      titlePosition: { x: 0, y: 0 },
      titleColor: 'white', // Default color for the floating title
      loadedImages: new Set(), // Track loaded high-res images
      lastMousePosition: { x: 0, y: 0 }, // Last mouse position to throttle updates
      requestAnimationFrameId: null, // ID for requestAnimationFrame to cancel it if necessary
    };
  },
  computed: {
    ...mapStores(useProjectsStore),
    categories() {
      if (!this.projects) return [];
      const allCategories = this.projects.flatMap(project => project.category);
      return ['Alle', ...new Set(allCategories)];
    },
    filteredProjects() {
      if (!this.projects) return [];
      if (this.selectedCategory === 'Alle') {
        return this.projects;
      }
      return this.projects.filter(project => project.category.includes(this.selectedCategory));
    },
  },
  mounted() {
    this.projects = this.projectsStore.projects;
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
      this.$nextTick(() => {
        this.initializeLazyLoad();
      });
    },
    navigateToRoute(route) {
      this.$router.push({ name: 'project-detail', params: { route } });
    },
    showTitle(title, color) {
      this.currentTitle = title;
      this.titleColor = color || 'white'; // Use the provided color or default to white
      this.titleVisible = true;
    },
    handleMouseMove(event) {
      const distance = Math.hypot(
        event.clientX - this.lastMousePosition.x,
        event.clientY - this.lastMousePosition.y
      );

      if (distance > 5) { // Only update if the mouse has moved more than 5 pixels
        this.lastMousePosition = { x: event.clientX, y: event.clientY };
        if (!this.requestAnimationFrameId) {
          this.requestAnimationFrameId = requestAnimationFrame(() => {
            this.updateTitlePosition(event);
            this.requestAnimationFrameId = null; // Reset the requestAnimationFrameId
          });
        }
      }
    },
    updateTitlePosition(event) {
      this.titlePosition.x = event.clientX + 20;
      this.titlePosition.y = event.clientY + 20;
      this.updateTitleColor(event);
    },
    hideTitle() {
      this.titleVisible = false;
      if (this.requestAnimationFrameId) {
        cancelAnimationFrame(this.requestAnimationFrameId);
        this.requestAnimationFrameId = null;
      }
    },
    markAsLoaded(image) {
      this.loadedImages.add(image);
    },

    updateTitleColor(event) {
      const element = event.target;
      const color = getComputedStyle(element).getPropertyValue('--bg-color');
      this.titleColor = color || 'white'; // Fallback to white if color is not set
    },
  },
};
</script>

<style scoped>
.text-block:hover {
  background-color: rgba(0,0,0,0.2);
  cursor: none;
}

.text-block {
  background-color: rgba(0,0,0,0);
  backdrop-filter: blur(0px);
  margin: 0;
  display: grid;
  place-content: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  /* grid-auto-rows: 30vw; */
  padding: 1rem;
  padding-top: 0rem;
  gap: 0.5rem;
  max-width: 100vw;
  align-items: start;
}

.floating-title {
  position: fixed;
  pointer-events: none;
  color: white;
  transform: translate(-50%, -50%);
  z-index: 1000;
  font-size: 1.5rem;
  text-align: center;
  min-width: 30vw;
  text-wrap: none;
  overflow-wrap: normal;
  font-family: "Januar" !important;
  line-height: 1;
}

.grid > div {
  background-size: cover;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  image-rendering: pixelated; 
  cursor: none;
  padding: 0;
}

.projectImage {
  aspect-ratio: 1.5;
  width:  calc(100vw - 2rem)
}

.projectText{
  display: none;
}



@media (min-width: 700px) {
  .grid{
    grid-template-columns: repeat(2, 1fr);
  }
  .projectImage{
    width:  calc((100vw - 2rem - 0.8rem)/2)
  }
}
@media (min-width: 1200px) {
  .grid{
    grid-template-columns: repeat(3, 1fr);
  }
  .projectImage{
    width:  calc((100vw - 2rem - 1.6rem)/3)
  }
}

@media (any-pointer: coarse) {
.projectText{
  display: flex; flex-direction: row; justify-content: space-between; padding-top: 0.4rem;
}
.grid{
    gap: 0.8rem;
  }
  .grid > div{
    cursor: pointer;
  }
  .floating-title{display: none;}
}

.grid > div > h2 {
  color: transparent;
}

.grid > div:hover > h2 {
  color: white;
}



.list-move, 
.list-enter-active,
.list-leave-active {
  transition: all 0.7s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-enter-from:nth-child(1),
.list-leave-to:nth-child(1) {
  transform: translateY(-30px);
}

.list-enter-from:nth-child(2),
.list-leave-to:nth-child(2) {
  transform: translateX(30px);
}

.list-enter-from:nth-child(3),
.list-leave-to:nth-child(3) {
  transform: translateX(-30px);
}

.list-enter-from:nth-child(4),
.list-leave-to:nth-child(4) {

  transform: translateY(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
