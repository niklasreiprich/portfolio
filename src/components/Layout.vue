<template>
    <div>
      <router-link to="/projects"><div class="Close"></div></router-link>

      <Header :title="headerTitle" :subtitle="headerSubtitle" :backgroundImage="headerBackgroundImage" />
      <ImageGrid :infoText="infoText" :infoList="infoList" :images="images" />
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from './Header.vue'
  import Footer from './Footer.vue'
  import ImageGrid from './ImageGrid.vue'
  
  export default {
    name: 'Layout',
    components: {
      Header,
      Footer,
      ImageGrid
    },
    props: {
      headerTitle: {
        type: String,
        required: true
      },
      headerSubtitle: {
        type: String,
        required: true
      },
      headerBackgroundImage: {
        type: String,
        required: true
      },
      infoText: {
        type: String,
        required: true
      },
      infoList: {
        type: String,
        required: true
      },
      images: {
        type: Array,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>

  .Close{
  background-image: url('close.svg');
  background-position: center;
  background-size: contain;
  width: 1.5rem;
  height: 1.5rem;
  position: fixed;
  top: var(--padding-gap);
  left: var(--padding-gap);
  margin: calc(var(--padding-gap) / 2);
  opacity: 0.7;
  z-index: 1000;
  transition: all ease 0.5s;
  }
  .Close:hover{
  scale: 1.1;
  cursor: pointer;
  opacity: 1;
  }


  /* Add any global styles for the layout here */
  </style>
  