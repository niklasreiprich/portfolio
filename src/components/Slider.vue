<template>
    <main>
      <Navigation />
      <Footer />
      <div
        class="background-element"
        @click="navigateToRoute(currentProject.route)"
        :style="{ backgroundImage: `url(/${currentBackgroundImage})` }"
      >
      </div>
    </main>
  </template>
  
  <script>
  import Navigation from '../components/Navigation.vue'
  import Footer from '../components/Footer.vue'
  import { mapStores } from "pinia";
  import { useProjectsStore } from "@/stores/projects.js";
  
  export default {
    name: "Startseite",
    data() {
      return {
        projects: undefined,
        currentProjectIndex: 0,
        currentBackgroundImage: ''
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
      this.startBackgroundImageRotation();
    },
    methods: {
      navigateToRoute(route) {
        this.$router.push(route);
      },
      startBackgroundImageRotation() {
        this.loadImage(this.currentProject.previewImage);
        setInterval(() => {
          this.currentProjectIndex = (this.currentProjectIndex + 1) % this.projects.length;
          this.loadImage(this.currentProject.previewImage);
        }, 1000); // 1000 Millisekunden = 1 Sekunde
      },
      loadImage(imageUrl) {
        const img = new Image();
        img.onload = () => {
          this.currentBackgroundImage = imageUrl;
        };
        img.src = `/${imageUrl}`;
      }
    }
  }
  </script>
  
  <style>
  body, html {
  }
  
  .background-element {
    width: 100vw;
    height: calc(100vh - 2.5rem);
    background-color: red;
    background-size: cover;
    background-position: center;
  }
  </style>
  