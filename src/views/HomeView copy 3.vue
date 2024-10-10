<template>
  <main>
    <Navigation />
    <div style="padding: var(--padding-vertical) var(--padding-horizonal)">
    <p style="grid-column: span 3; font-size: 2.5rem; line-height: 1.1;">Niklas Reiprich <img class="text-image" src="/images/lowres/Ludwigstrasse/Ludwigstrasse1.jpg"><img class="text-image" src="/images/lowres/Ludwigstrasse/Ludwigstrasse1.jpg"> is a communication designer with a strong focus on type , graphic design and experimental design, currently based in Mainz, Germany. </p>
    <Footer />
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
  components: {
    Navigation,
    Footer,
  },
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
        this.loadImage("images/highres/" + this.currentProject.route + "/" + this.currentProject.previewImage);
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

<style scoped>

.text-image{height: 1em; transform: translateY(0.12em);padding: 0 0.08em}


nav{
  position: sticky;
  top:0;
  margin-top: calc(100vh - 2.5rem)
}

body, html {
  height: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-element {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: grey;
  background-size: cover;
  background-position: center;
}

</style>
