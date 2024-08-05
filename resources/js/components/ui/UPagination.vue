<template>
    <div class="pagination">
      <button class="button button_grey" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Назад</button>
      <button
        class="button button_grey"
        v-for="page in totalPages"
        :key="page"
        :class="{ button_active: currentPage === page }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <button class="button button_grey" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Вперед</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: {
        type: [Number, String],
        default: 1,
      },
      itemsPerPage: {
        type: [Number, String],
        default: 10,
      },
      totalItems: {
        type: [Number, String],
        default: 0,
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.totalItems / this.itemsPerPage);
      },
    },
    methods: {
      goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.$emit('page-changed', page);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-top: 20px;
  }
  </style>