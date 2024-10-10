<template>
    <div class="ImageGrid">
      <div class="InfoText">{{ infoText }}</div>
      <div class="InfoList" v-html="infoList"></div>
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image.src"
        :class="['ProjectImage', image.class]"
      />
    </div>
  </template>

  <script>
  export default {
    name: 'ImageGrid',
    props: {
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
  .ImageGrid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--padding-gap);
    padding: var(--padding-gap);
    padding-top: 0.5rem;
    /* padding-top: 0; */
  }

  .ProjectImage {
    width: 100%;
    height: 100%;
  }

  .InfoText {
    grid-column: 1 / 11;
    padding-right: 1rem;
    font-family: "Januar";
    letter-spacing: 0.01em;
    line-height: 1.15;
    margin-bottom: 0.5rem;
    column-count: 2;
  }

  .InfoList {
    grid-column: 11 / 13;
    font-family: "Monospace";
    font-size: 0.666rem;
    padding-bottom: 1rem;
    margin-bottom: 0.5rem;
    text-align: right;

  }

  .sImg {
    grid-column: span 4;
  }

  .mImg {
    grid-column: span 6;
  }

  .lImg {
    grid-column: span 8;
    grid-row: span 2;
  }

  .xImg {
    grid-column: span 12;
  }

  @media (min-width: 600px) and (max-width: 1024px) {
    .sImg {
      grid-column: span 6;
    }

    .mImg {
      grid-column: span 6;
    }

    .lImg {
      grid-column: span 12;
      grid-row: span 1;
    }

    
  .InfoText {
    grid-column: 1 / 11;
    padding-right: 1rem;
    font-family: "Januar";
    letter-spacing: 0.01em;
    line-height: 1.15;
    margin-bottom: 0.5rem;
    column-count: 1;
  }

  .InfoList {
    grid-column: 11 / 13;
    font-family: "Monospace";
    font-size: 0.666rem;
    padding-bottom: 1rem;
    margin-bottom: 0.5rem;
    text-align: left;

  }
  }

  @media (max-width: 599px) {
    .sImg {
      grid-column: span 12;
    }

    .mImg {
      grid-column: span 12;
    }

    .lImg {
      grid-column: span 12;
      grid-row: span 1;
    }

    .InfoText {
      grid-column: 1 / 13;
      column-count: 1;

    }

    .InfoList {
      grid-column: 1 / 13;
      text-align: left;

    }

    .Start {
      flex-direction: column-reverse;
      justify-content: space-between;
      align-items: flex-start;
    }
  }
  </style>
