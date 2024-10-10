<template>
    <div id="category-filter" class="filter-boxes">
      <div
        v-for="category in categories"
        :key="category"
        @click="selectCategory(category)"
        :class="{'filter-box': true, 'selected': category === selectedCategory}"
      >
        {{ category }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FilterComponent',
    props: {
      categories: Array,
      selectedCategory: String
    },
    methods: {
      selectCategory(category) {
        this.$emit('select-category', category);
      }
    }
  };
  </script>
  
  <style scoped>
  .filter-boxes {
    margin: 1rem;
    cursor: pointer;
    display: flex;
    gap: 0.5rem;
  }
  
  .filter-box {
    padding: 0rem 0.4rem;
    padding-top: 0.05rem;
    background-color: #222;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }
  
  .filter-box:hover {
    background-color: #444;
  }
  
  .filter-box.selected {
    background-color: #444;
    color: white;
  }
  </style>
  