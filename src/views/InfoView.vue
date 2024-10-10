<template>
    <main>
      <Navigation />
      <div class="content-container">
          <p style="grid-column: span 3; font-size: 5vh; line-height: 1.1;">I studied communication design in Saarbrücken with Indra Kupferschmid and quickly discovered my passion for type while studying and designing posters as a member of an art collective. Since 2023, I have been expanding my skills in creative coding and animation as part of a master's degree in communication design in Mainz. This year I also joined Typemates as a motion and graphic designer. </p>
        <p style="font-family: 'Monospace'; grid-column: span 1; font-size: 0.8em; place-self: end;">As a freelancer, I am open to commissions and always interested in collaboration opportunities, so just drop me a line.<br/> <br/>Contact: <br/>niklas@reiprich.com<br/>@niklasreiprich</p>
      <img style="padding-top: 1rem; grid-column: 3/4; width: 100%; place-self: end;" src="/images/niklasportfoliogif.gif">
      </div>
      <Footer />
    </main>
  </template>
  
  <script>
  import Navigation from '../components/Navigation.vue'
  import Footer from '../components/Footer.vue'
  import { mapStores } from "pinia";
  import { useProjectsStore } from "@/stores/projects.js";
  
  export default {
    name: "Info",
    components: {
    Navigation,
    Footer,
  },
    
  }
  </script>
  
  <style>
main {
    max-height: 100vh;
    margin: 0;
    display: flex;
    flex-direction: column;
  
  }

  .content-container{
    flex-grow: 1;
    padding: 1rem;
    display: grid;
    grid-template-columns: 2fr 1fr 30vh; ;
    grid-template-rows: auto auto ;
  }

  

  </style>
  