<template>
  <div :class="cursorClass">
    <div class="font-header" style="display: flex; flex-direction: row; gap: 1rem">
      <label style="white-space: nowrap;" for="font-input">{{ projectTitle }}</label>
      <input type="range" id="font-size" min="32" max="160" v-model="size" @input="updateContainerSize" class="styled-slider"/>
    </div>
    <div ref="inputContainer" class="input-container" style="  overflow-wrap: anywhere;
">
      <textarea
        ref="textarea"
        v-model="text"
        :style="inputStyle"
        placeholder="Type something..."
        @input="updateContainerSize"
        @blur="updateContainerSize"
        spellcheck="false"
        class="dynamic-textarea"
      ></textarea>
    </div>
    <div ref="textSizer" :style="textSizerStyle">{{ text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    projectTitle: {
      type: String,
      required: true
    },
    projectSource: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      text: 'Your preview will appear here.',
      size: 64,
      fontLoaded: false,
      mouseTimeout: null,
      cursorClass: 'still-cursor'
    };
  },
  computed: {
    inputStyle() {
      return {
        fontFamily: this.fontLoaded ? this.projectTitle : 'inherit',
        fontSize: this.size + 'px',
        backgroundColor: 'transparent',
        border: 'none',
        padding: '0px',
        outline: 'none',
        boxSizing: 'content-box',
        resize: 'none',
        // overflow: 'hidden',
        width: '100%',
        maxWidth: '100%'
      };
    },
    textSizerStyle() {
      return {
        fontFamily: this.fontLoaded ? this.projectTitle : 'inherit',
        fontSize: this.size + 'px',
        position: 'absolute',
        visibility: 'hidden',
        whiteSpace: 'nowrap'
      };
    }
  },
  mounted() {
    this.loadFont();
    document.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('resize', this.updateContainerSize); // Update on window resize
    this.updateContainerSize(); // Initial update
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('resize', this.updateContainerSize);
  },
  methods: {
    loadFont() {
      const font = new FontFace(this.projectTitle, `url(${this.projectSource})`);
      font
        .load()
        .then(loadedFont => {
          document.fonts.add(loadedFont);
          this.fontLoaded = true;
          this.updateContainerSize();
        })
        .catch(error => {
          console.error('Failed to load font:', error);
        });
    },
    updateContainerSize() {
      this.$nextTick(() => {
        const textarea = this.$refs.textarea;
        const inputContainer = this.$refs.inputContainer;
        const maxWidth = window.innerWidth - inputContainer.getBoundingClientRect().left - 20; // 20px padding from the right
        textarea.style.maxWidth = `${maxWidth}px`; // Set maximum width
        textarea.style.height = 'auto'; // Reset height to calculate the correct scrollHeight
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to the scrollHeight
      });
    },
    handleMouseMove() {
      clearTimeout(this.mouseTimeout);
      this.cursorClass = 'moving-cursor';
      this.mouseTimeout = setTimeout(() => {
        this.cursorClass = 'still-cursor';
      }, 300); // Adjust the timeout as needed
    }
  }
};
</script>

<style scoped>
.moving-cursor {
  cursor: pointer;
}

.still-cursor {
  cursor: default;
}

.input-container {
  display: inline-block;
  white-space: nowrap;
  /* overflow-x: hidden; */
  box-sizing: content-box;
  position: relative;
  width: 100%; /* Ensure the container takes the full width available */
}

.dynamic-textarea {
  box-sizing: border-box;
  height: auto;
  min-height: 1em; /* Adjust this to set the minimum height */
  overflow-wrap: anywhere;
  overflow-y: hidden;
  color: var(--color-text);
  width: 100%;
  text-transform: lowercase;
}

.styled-slider {
  -webkit-appearance: none;
  width: 10rem;
  height: 0.05rem;
  background: var(--color-text);
  outline: none;
  opacity: 1;
  transition: opacity .2s;
  margin-top: 0.5rem;
}

.styled-slider:hover {
  opacity: 1;
}

.styled-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  border-width: 0;

  border-color: var(--color-background);
  background: var(--color-text);
  cursor: pointer;
}

.styled-slider::-moz-range-thumb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border-width: 0;
  border-color: var(--color-background);

  background: var(--color-text);
  cursor: pointer;
}

.font-header {
  opacity: 0;
}

.draggable-content:hover .font-header {
  opacity: 1;
}
</style>
