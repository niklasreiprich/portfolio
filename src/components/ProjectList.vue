<template>
    <div class="container" :style="{ height: containerHeight + 'px' }">
      <TransitionGroup name="list" tag="div" class="transition-group">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
          @start-drag="startDrag"
        />
      </TransitionGroup>
    </div>
  </template>
  
  <script>
  import ProjectCard from './ProjectCard.vue';
  
  export default {
    name: 'ProjectList',
    components: { ProjectCard },
    props: {
      projects: Array,
      containerHeight: Number
    },
    methods: {
      startDrag(event, id) {
        this.$emit('start-drag', event, id);
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    position: relative;
    width: 100%;
    transition: height 0.5s ease;
  }
  
  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 2s ease;
  }
  
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transition: all 2s ease;

    transform: translateY(30px);
  }
  
  .list-leave-active {
    position: absolute;
  }
  </style>
  