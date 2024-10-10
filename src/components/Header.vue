<template>
  <div class="Start">
    <img :src="backgroundImage" class="background-image" alt="Background" :style="backgroundImageStyle">
    <h1 class="Title">{{ title }}</h1>
    <h1 class="Title">{{ subtitle }}</h1>
  </div>
</template> 

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    backgroundImage: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      imageOpacity: 1,
      imageBlur: 0
    };
  },
  computed: {
    backgroundImageStyle() {
      return {
        opacity: this.imageOpacity,
        filter: `blur(${this.imageBlur}px)`
      };
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const maxScroll = windowHeight / 1; // Adjust this value as needed
      this.imageOpacity = Math.max(0, 1 - scrollTop / maxScroll);
      this.imageBlur = Math.min(10, scrollTop / maxScroll * 10); // Adjust the maximum blur value as needed
    }
  }
}
</script>


<style scoped>
.Start {
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: var(--padding-gap);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  overflow: hidden; /* Ensure children don't overflow the container */
}

.background-image {
  position: fixed;
  scale: 1.05;
  transition: all 0.05s linear;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  
  z-index: -1; /* Place it behind the content */
}

.Title {
  color: white;
  /* text-shadow: 0px 0px 20px black; */
  margin-bottom: -0.1em;
  z-index: 1; /* Ensure it stays above the background image */
}

@media (max-width: 599px) {

    .InfoText {
      grid-column: 1 / 13;
    }
  
    .InfoList {
      grid-column: 1 / 13;
    }
  
    .Start {
      flex-direction: column-reverse;
      justify-content: space-between;
      align-items: flex-start;
    }
  }

</style>
