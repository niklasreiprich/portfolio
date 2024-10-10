<template>
    <div v-if="visible" class="lightbox-overlay" @click="close">
      <div class="navigation">
        <div style="left: 1.5rem;" class="arrow left-arrow" @click.stop="prev">←</div>
        <div style="right: 1.5rem;" class="arrow right-arrow" @click.stop="next">→</div>
      </div>
      <div class="project-title">
        <span style="font-family: 'JanuarBold';">{{ project.title }}</span><br />{{ project.text }}
      </div>
      <button class="close-button" @click="close"></button>
  
      <div class="lightbox-content" @click.stop>
        <div class="media">
          <div v-if="project.type === 'image'">
            <img :src="project.src" alt="Project Image" />
          </div>
          <div v-else-if="project.type === 'video'">
            <video ref="video" loop autoplay muted>
              <source :src="project.src" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      project: {
        type: Object,
        required: true,
      },
      projects: {
        type: Array,
        required: true,
      },
      currentIndex: {
        type: Number,
        required: true,
      },
    },
    watch: {
      project: {
        immediate: true,
        handler(newProject) {
          if (newProject.type === 'video' && this.$refs.video) {
            this.$nextTick(() => {
              const video = this.$refs.video;
              video.pause();
              video.currentTime = 0;
              video.load();
              video.play();
            });
          }
        },
      },
    },
    methods: {
      close() {
        this.$emit('close');
      },
      next() {
        const newIndex = (this.currentIndex + 1) % this.projects.length;
        this.$emit('updateProject', newIndex);
      },
      prev() {
        const newIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
        this.$emit('updateProject', newIndex);
      },
    },
  };
  </script>
  
  <style scoped>
  .lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .lightbox-content {
    background: transparent;
    padding: 0;
    border-radius: 5px;
    text-align: center;
    position: relative;
    max-width: 90%;
    max-height: 90%;
    transition: transform 0.3s ease;
  }
  
  .lightbox-content img,
  .lightbox-content video {
    max-width: 100%;
    max-height: 80vh;
  }
  
  .navigation {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
  }
  
  .arrow {
    cursor: pointer;
    font-size: 3rem;
    color: white;
    user-select: none;
    position: absolute;
    transform: translateY(-50%);
  }
  
  .close-button {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: 1.8rem;
    height: 1.8rem;
    background: url('CloseMenu.svg') no-repeat center center;
    filter: invert();
    background-size: contain;
    border: none;
    cursor: pointer;
  }
  
  .project-title {
    position: absolute;
    bottom: 1.5rem;
    left: 1.5rem;
    right: 1.5rem;
    color: white;
    border-radius: 5px;
    width: auto;
    max-width: 90%;
  }
  </style>
  