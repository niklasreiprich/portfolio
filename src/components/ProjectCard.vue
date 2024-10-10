<template>
    <div
      :data-id="project.id"
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
  </template>
  
  <script>
  import FontTester from '../components/FontTester.vue';
  
  export default {
    name: 'ProjectCard',
    components: { FontTester },
    props: {
      project: Object
    },
    methods: {
      startDrag(event, id) {
        this.$emit('start-drag', event, id);
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
      }
    }
  };
  </script>
  
  <style scoped>
  .draggable {
    cursor: grab;
  }
  
  .draggable:active {
    cursor: grabbing;
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
  
  .entryMedia {
    max-height: 100%;
    max-width: 100%;
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
  </style>
  