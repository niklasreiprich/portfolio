<template>
  <main>
    <Navigation />
    <div style="padding: 1rem; padding-bottom: 0rem;">
      <h1>Playground</h1>
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
    <div style="padding: 0 1.1rem"><p>A place to dump all my small but still beloved fiddles, scribbles, and jumbles.</p></div>
    <div class="container" :style="{ height: containerHeight + 'px' }">
      <TransitionGroup name="list" tag="div" class="transition-group">
        <div
          v-for="(project, index) in filteredProjects"
          :data-id="project.id"
          :key="project.id"
          @mousedown="startDrag($event, project.id)"
          @mouseup="endDrag($event, project, index)"
          :class="['draggable', cursorClass, project.category]"
          :style="getEntryStyle(project)"
        >
          <div class="draggable-content">
            <video class="entryMedia" v-if="project.type === 'video'" autoplay loop muted>
              <source :src="`images/highres/Playground/${project.source}`" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <img class="entryMedia" v-if="project.type === 'image'" :src="`images/highres/Playground/${project.source}`" alt="My cool gif" @dragstart.prevent />
            <div v-if="project.type != 'font'" class="text-block">{{project.title}}</div>
            <FontTester v-if="project.type === 'font'" :projectTitle="project.title" :projectSource="`images/highres/Playground/${project.source}`" />
          </div>
        </div>
      </TransitionGroup>
    </div>

    <Footer />
    <LightboxModal
      :visible="visible"
      :project="currentProject"
      :projects="validProjects"
      :currentIndex="currentIndex"
      @close="closeLightbox"
      @updateProject="updateProject"
    />
  </main>
</template>


<script>
import Navigation from '../components/Navigation.vue';
import Footer from '../components/Footer.vue';
import P5Canvas from '../components/p5Canvas.vue';
import FontTester from '../components/FontTester.vue';
import LightboxModal from '../components/LightboxModal.vue';

import { mapStores } from 'pinia';
import { usePlaygroundStore } from '@/stores/playground.js';

export default {
  name: 'IntegratedComponent',
  components: {
    Navigation,
    Footer,
    P5Canvas,
    FontTester,
    LightboxModal
  },
  data() {
    return {
      projects: undefined,
      selectedCategory: 'Alle',
      titleVisible: false,
      currentTitle: '',
      titlePosition: { x: 0, y: 0 },
      positions: {},
      containerHeight: 0,
      dragging: null,
      dragOffset: { x: 0, y: 0 },
      mouseTimeout: null,
      cursorClass: 'still-cursor',
      visible: false,
      currentProject: {},
      currentIndex: 0,
      isDragging: false,
      clickStartX: 0,
      clickStartY: 0,
    };
  },
  computed: {
    ...mapStores(usePlaygroundStore),
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
    validProjects() {
      return this.filteredProjects.filter(project => project.type !== 'font');
    }
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
      this.$nextTick(() => {
        this.updateContainerHeight();
      });
    },
    navigateToRoute(route) {
      this.$router.push(route);
    },
    showTitle(title) {
      this.currentTitle = title;
      this.titleVisible = true;
    },
    updateTitlePosition(event) {
      this.titlePosition.x = event.clientX + 20;
      this.titlePosition.y = event.clientY + 20;
    },
    hideTitle() {
      this.titleVisible = false;
    },
    getEntryStyle(project) {
      const position = this.positions[project.id] || { x: 0, y: 0 };
      return {
        maxWidth: `${project.width}vw`,
        position: 'absolute',
        zIndex: '500',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: this.dragging ? 'none' : 'all 0.5s ease'
      };
    },
    updatePositions(projects, reset = false) {
      const maxY = this.calculateMaxY(projects);
      projects.forEach((project) => {
        if (reset || !this.positions[project.id]) {
          this.positions[project.id] = this.getRandomPosition(maxY);
        }
      });
      this.$nextTick(() => {
        this.updateContainerHeight();
      });
    },
    calculateMaxY(projects) {
      const baseHeight = 300; // Adjust this value based on the height of your elements
      return Math.ceil(projects.length / 5) * baseHeight; // Adjust 5 based on the desired density
    },
    getRandomPosition(maxY) {
      const containerWidth = window.innerWidth;
      const x = Math.random() * (containerWidth - 200); // Adjust 200 based on your entry width
      const y = Math.random() * maxY;
      return { x, y };
    },
    startDrag(event, id) {
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.type === 'range') {
        return;
      }
      this.isDragging = true;
      this.dragging = id;
      this.clickStartX = event.clientX;
      this.clickStartY = event.clientY;
      const position = this.positions[id];
      this.dragOffset.x = event.clientX - position.x;
      this.dragOffset.y = event.clientY - position.y;
      event.preventDefault();
    },
    drag(event) {
      if (!this.dragging) return;
      const position = this.positions[this.dragging];
      position.x = event.clientX - this.dragOffset.x;
      position.y = event.clientY - this.dragOffset.y;
      this.updateContainerHeight();
    },
    stopDrag() {
      this.dragging = null;
      this.updateContainerHeight();
      setTimeout(() => {
        this.isDragging = false;
      }, 100); // Adjust the timeout as needed
    },
    endDrag(event, project, index) {
      const clickEndX = event.clientX;
      const clickEndY = event.clientY;
      const clickDistance = Math.sqrt((clickEndX - this.clickStartX) ** 2 + (clickEndY - this.clickStartY) ** 2);

      if (!this.isDragging || clickDistance < 5) {
        this.openLightbox(project, index);
      }
      this.isDragging = false;
    },
    updateContainerHeight() {
      let maxY = 0;
      for (const id in this.positions) {
        const position = this.positions[id];
        const element = this.$el.querySelector(`[data-id="${id}"]`);
        if (element) {
          const bottom = position.y + element.offsetHeight;
          if (bottom > maxY) {
            maxY = bottom;
          }
        }
      }
      this.containerHeight = maxY + 150; // Add some padding for the footer
    },
    handleMouseMove() {
      clearTimeout(this.mouseTimeout);
      this.cursorClass = 'moving-cursor';
      this.mouseTimeout = setTimeout(() => {
        this.cursorClass = 'still-cursor';
      }, 100); // Adjust the timeout as needed
    },
    openLightbox(project, index) {
      if (project.type === 'image' || project.type === 'video') {
        this.currentProject = {
          ...project,
          src: `images/playgroundHighres/${project.source}`
        };
        this.currentIndex = this.validProjects.findIndex(p => p.id === project.id);
        this.visible = true;
        this.addKeyboardNavigation();
      }
    },
    updateProject(newIndex) {
      const newProject = this.validProjects[newIndex];
      this.currentProject = {
        ...newProject,
        src: `images/highres/Playground/${newProject.source}`
      };
      this.currentIndex = newIndex;
      this.$nextTick(() => {
        // Ensure the video element reloads when navigating
        const videoElement = this.$refs.video;
        if (videoElement) {
          videoElement.load();
        }
      });
    },
    addKeyboardNavigation() {
      window.addEventListener('keydown', this.handleKeydown);
    },
    removeKeyboardNavigation() {
      window.removeEventListener('keydown', this.handleKeydown);
    },
    handleKeydown(event) {
      if (event.key === 'ArrowRight') {
        this.next();
      } else if (event.key === 'ArrowLeft') {
        this.prev();
      } else if (event.key === 'Escape') {
        this.closeLightbox();
      }
    },
    next() {
      const newIndex = (this.currentIndex + 1) % this.validProjects.length;
      this.updateProject(newIndex);
    },
    prev() {
      const newIndex = (this.currentIndex - 1 + this.validProjects.length) % this.validProjects.length;
      this.updateProject(newIndex);
    },
    closeLightbox() {
      this.visible = false;
      this.removeKeyboardNavigation();
    }
  },
  mounted() {
    this.projects = this.playgroundStore.projects;
    if (this.projects) {
      this.updatePositions(this.filteredProjects, true);
    }
    this.$nextTick(() => {
      this.updateContainerHeight();
    });
    document.addEventListener('mousemove', this.drag);
    document.addEventListener('mouseup', this.stopDrag);
    document.addEventListener('mousemove', this.handleMouseMove);
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.removeKeyboardNavigation();
  },
  watch: {
    filteredProjects: {
      immediate: true,
      handler(newProjects) {
        this.updatePositions(newProjects, true);
        this.$nextTick(() => {
          this.updateContainerHeight();
        });
      }
    }
  }
};
</script>


<style scoped>
/* Add lightbox title styling */
html {
  overflow-x: hidden;
  max-width: 100vw;
}
.entryMedia {
  max-height: 100%;
  max-width: 100%;
}

.container {
  position: relative;
  width: 100%;
  transition: height 0.5s ease;
}

main {
  min-height: 100vh;
  background-image: url('../../public/img/Niklas_Collage.mp4');
  background-size: cover;
  image-rendering: pixelated;
  margin: 0;
  padding: 0;
  z-index: 0;
}

.draggable:hover .text-block {
  color: var(color-text);
}

.text-block {
  color: transparent;
}

.container {
  position: relative;
  width: 100%;
}

.draggable-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: flex-start;
  justify-content: center;
}

.grid {
  display: none;
}

.floating-title {
  position: fixed;
  color: white;
  transform: translate(-50%, -50%);
  z-index: 1000;
  font-size: 1.5rem;
  text-align: center;
  min-width: 30vw;
  text-wrap: none;
  overflow-wrap: normal;
  font-family: 'Januar' !important;
  line-height: 1;
}

.grid > div {
  padding: 7vw;
  padding-left: 0;
  padding-top: 0;
}

.grid > div > h2 {
  color: transparent;
}

.grid > div:hover > h2 {
  color: var(color-text);
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-active {
  position: absolute;
}

.draggable {
}

.draggable:active {
  cursor: grabbing;
}

.moving-cursor {
  cursor: grab;
}

.still-cursor {
  cursor: zoom-in;
}
</style>
