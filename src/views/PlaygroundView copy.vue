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
    <div style="padding: 0 1.1rem"><p>A place to dump allmy small but still beloved fiddles, scribbles, and jumbles.</p></div>
    <div class="container" :style="{ height: containerHeight + 'px' }">
      <TransitionGroup name="list" tag="div" class="transition-group">  
        <div
          v-for="project in filteredProjects"
          :data-id="project.id"

          :key="project.id"
          @mousedown="startDrag($event, project.id)"
          :class="['draggable', project.category]"
          :style="getEntryStyle(project)"
        >
          <div class="draggable-content">
            <h2 class="text-block" style="flex-grow: 1;"></h2>
            <video class="entryMedia" v-if="project.type === 'video'" autoplay loop muted>
              <source :src="`images/highres/Playground/${project.source}`" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <img class="entryMedia" v-if="project.type === 'image'" :src="`images/highres/Playground/${project.source}`" alt="My cool gif" @dragstart.prevent />
            <FontTester v-if="project.type === 'font'" :projectTitle="project.title" :projectSource="`images/highres/Playground/${project.source}`" />
          </div>
        </div>
      </TransitionGroup>
    </div>

    <Footer />
    <!-- <P5Canvas /> -->
  </main>
</template>

<script>
import Navigation from '../components/Navigation.vue';
import Footer from '../components/Footer.vue';
import P5Canvas from '../components/p5Canvas.vue';
import FontTester from '../components/FontTester.vue';

import { mapStores } from 'pinia';
import { usePlaygroundStore } from '@/stores/playground.js';

export default {
  name: 'IntegratedComponent',
  components: {
    Navigation,
    Footer,
    P5Canvas,
    FontTester
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
      transition: this.dragging ? 'none' : 'all 0.5s ease',
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
    this.dragging = id;
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
},
watch: {
  filteredProjects: {
    immediate: true,
    handler(newProjects) {
      this.updatePositions(newProjects, true);
      this.$nextTick(() => {
        this.updateContainerHeight();
      });
    },
  },
},

};
</script>

<style scoped>
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
  background-color: black;
  z-index: 0;
}

.text-block:hover {
  background-color: rgba(0, 0, 0, 0.2);
  cursor: none;
}

.text-block {
  background-color: rgba(0, 0, 0, 0);
  backdrop-filter: blur(0px);
  margin: 0;
  display: grid;
  place-content: center;
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
  color: white;
}

.filter-boxes {
  margin: 1rem;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
}

.filter-box {
  padding: 0rem 0.4rem;
  padding-top: 0.05rem;
  background-color: #222;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.filter-box:hover {
  background-color: #444;
}

.filter-box.selected {
  background-color: #444;
  color: white;
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
  cursor: grab;
}

.draggable:active {
  cursor: grabbing;
}
</style>
