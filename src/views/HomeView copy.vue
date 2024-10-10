<script setup>
// import Navigation from '../components/Navigation.vue'
</script>

<template>
  <main>
    <video autoplay muted loop>
        <source src="../../public/img/Niklas_Collage.mp4" type="video/mp4" />
    </video>
  
    <h1 class="intro-text"><span>Wie können wir Räume in der Stadt neu gestalten? Mit dieser Frage haben sich Studierende des Masterstudiengangs Kommunikationsdesign der Hochschule Mainz beschäftigt. Dabei sind vier interaktive Stationen in der Mainzer Innenstadt entstanden, die vom 25. April bis zum 10. Mai 2024 erfahrbar sind. Wie können wir Räume in der Stadt neu gestalten? Mit dieser Frage haben sich Studierende des Masterstudiengangs Kommunikationsdesign der Hochschule Mainz beschäftigt. Dabei sind vier interaktive Stationen in der Mainzer Innenstadt entstanden, die vom 25. April bis zum 10. Mai 2024 erfahrbar sind.</span></h1>
  </main>
</template>

<style scoped>
main{
  max-height: 100svh;
  min-height: 100svh;
  background-image: url(../../public/img/Niklas_Collage.mp4);
  background-size: cover;
  image-rendering: pixelated;
  margin: 0;
  padding: 0;
  display: grid;
  place-content: center;
}

.intro-text{
  grid-column: 1/2;
  grid-row: 1/2;
  z-index: 100;
  color: white;
  text-align: center;
  /* max-width: 50rem; */
  font-family: 'Light';
  font-family: 'Light';
    line-height: 1;
    word-break: break-word;
    transform: translateY(50%);
}

.video-container {
    height: 300px;
    width: 300px;
    position: relative;
}

main video {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  z-index: 0;
}
</style>

