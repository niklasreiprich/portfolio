<template>
    <footer class="footer" style="margin-top: auto">
        <div class="Unterleiste">
          <button class="text-button" @click="toggleMode"></button>
          <p>Impressum</p>
        <p>Datenschutz</p>
      </div>
    </footer>
  </template>
  
  <script>
 export default {
  name: 'footer',
  data() {
    return {
      isDarkMode: false
    };
  },
  methods: {
    toggleMode() {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
    }
  }
};
  </script>
  
  <style scoped>
  .footer{
    display: grid;
  }


  .Unterleiste {
    margin-top: auto;
    padding: var(--padding-vertical) var(--padding-horizonal);
    display: flex;
    gap: var(--padding-gap);
  }

  .text-button {
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  flex-grow: 1;
  text-align: left;
  cursor: pointer;
  padding: 0;
  text-decoration: none;
  background-image: url("DarkMode.svg");
  background-repeat: no-repeat;
  background-size: 1rem;
  background-position: start;
  filter: invert();
  width: 2.5rem;
  background-position-x: left;
  background-position-y: center;
}

.dark-mode .text-button{
  filter: none
}

.text-button:hover {
  text-decoration: none;
}
  </style>
  