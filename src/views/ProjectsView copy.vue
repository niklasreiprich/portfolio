<template>
  <main>
    <!-- <Slider /> -->
    <Navigation />
    <div style="padding: 1rem; padding-bottom: 0rem;">
      <h1>Projects</h1>
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
          @mouseover="showTitle(project.title)"
          @mousemove="updateTitlePosition"
          @mouseleave="hideTitle"
          :class="['project-item', project.category]"
          class="lazyload"
          :style="{padding: 0, width: '100%', height: '100%', backgroundImage: `url('images/lowres/${project.previewImage}')`}"
          :data-bg="`images/highres/${project.previewImage}`">
          <h2 class="text-block" style="flex-grow: 1;"></h2>
          <!-- <img
            class="entryMedia lazyload"
            :data-src="`images/highres/${project.previewImage}`"
            :src="`images/lowres/${project.previewImage}`"
            alt="Project image"
            @dragstart.prevent
          /> -->
        </div>
      </TransitionGroup>
    </div>

    <div style="color: white;" class="floating-title" v-if="titleVisible" :style="{ top: titlePosition.y + 'px', left: titlePosition.x + 'px' }">
      <span class="arrow">↗</span> {{ currentTitle }}
    </div>
    <Footer />
  </main>
</template>

<script>
import Navigation from '../components/Navigation.vue';
import Footer from '../components/Footer.vue';
import Slider from '../components/Slider.vue';

import { mapStores } from 'pinia';
import { useProjectsStore } from '@/stores/projects.js';

export default {
  name: 'Startseite',
  components: {
    Navigation,
    Footer,
    Slider,
  },
  data() {
    return {
      projects: undefined,
      selectedCategory: 'Alle', // Default value for filtering
      uniqueCategories: undefined,
      titleVisible: false,
      currentTitle: '',
      titlePosition: { x: 0, y: 0 },
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
    getLowQualityImage(url) {
      // Generate a low-quality image URL. This can be done by using a CDN or any other method you prefer.
      // For example, if using a CDN, you might add a query parameter to request a low-res version.
      return `${url}?low-quality=true`; // Adjust this to fit your needs.
    },
  },
};
</script>

<style scoped>
.entryMedia {
  object-fit: cover;
  width: 100%;
  height: 100%;
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

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 30vw;
  padding: 1rem;
  padding-top: 0rem;
  gap: 0.5rem;
  max-width: 100vw;
}

.floating-title {
  position: fixed;
  pointer-events: none;
  color: white;
  transform: translate(-3%, -80%); 
  z-index: 1000;
  cursor: none;
  font-size: 1.5rem;
  text-align: left;
  min-width: 40vw;
  overflow-wrap: normal;
  font-family: 'Januar' !important;
  line-height: 1;
}

.grid > div {
  background-size: cover;
  background-color: grey;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: none;
  transition: transform 0.5s ease, opacity 0.5s ease;
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

.list-enter-active,
.list-leave-active,
.list-move {
  transition: all 0.5s ease;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

</style>
