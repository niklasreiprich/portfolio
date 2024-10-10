<!-- src/views/ProjectDetailView.vue -->
<template>
    <main>
      <Navigation />
  
      <div v-if="project" class="project-container">
        <div class="text-column">

          <h2>{{ project.title }}</h2>
          <p style="flex-grow: 1;">{{ project.text }}</p>
          <!-- <p><strong>Tags:</strong> {{ project.tags }}</p> -->
          <p><strong></strong>{{ project.year }}</p>

          <p><strong></strong>{{ project.category.join(', ') }}</p>
        </div>
        <div class="images-column">
          <div v-for="(image, index) in project.images" :key="index" class="image-container">
            <img class="lazyload" :data-src="getImageHighResPath(image)" :src="getImagePath(image)" :alt="`Image ${index + 1}`" />
          </div>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
      <Footer style="position: absolute;
  bottom: 0; right: 0; left: 0; z-index: 200"/>

    </main>
  </template>
  
  <script>
  import { useProjectsStore } from '@/stores/projects';
  import Navigation from '../components/Navigation.vue';
  import Footer from '../components/Footer.vue';
  
  export default {
    props: ['route'],
    components: {
      Navigation,
      Footer
    },
    data() {
      return {
        project: null
      }
    },
    created() {
      const store = useProjectsStore()
      this.project = store.projects.find(project => project.route === this.route)
    },
    methods: {
      getImagePath(image) {
        return `/images/lowres/${this.project.route}/${image}`
      },
      getImageHighResPath(image) {
        return `/images/highres/${this.project.route}/${image}`
      }
    }
  }
  </script>
  
  <style scoped>
  .image-container {
    margin-bottom: 0.5rem;
  }
  main {
    height: 100vh; /* Ensure the main container takes the full viewport height */
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .project-container {
    position: absolute;
    flex-grow: 1;
    display: grid;
    grid-template-columns: 22rem 1fr;
    gap: 1rem;
    max-width: 100vw;
    height: 100%;
    overflow: hidden; /* Prevent scrolling on the main container */
  }
  .project-container > div {
    overflow-y: scroll; /* Allow vertical scrolling in both columns */
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none;  /* For Internet Explorer and Edge */
  }
  .project-container > div::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
  .text-column, .images-column {
    padding: 1rem;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    box-sizing: border-box; /* Ensure padding is included in the element's total width and height */
  }
  .text-column{
    display: flex;
    flex-direction: column;
  }
  img {
    width: 100%;
  }
  </style>
  
  