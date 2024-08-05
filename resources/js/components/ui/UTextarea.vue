<template>
    <div class="input-wrapper">
      <label v-if="label" :for="label">{{ label }}</label>
      <textarea
        :id="label"
        :value="value"
        :disabled="disabled"
        @input="$emit('input', $event.target.value)"
        :class="{ 'error': error }"
        class="input"
        :rows="rows"
      />
      <div v-if="error" class="error-message">{{ error }}</div>
    </div>
  </template>
  
  <script>
  export default {
    model:{
      prop: 'value',
      event: 'input'
    },
    props: {
      label: {
        type: String,
      },
      value: {
        required: true
      },
      error: {
        type: String,
        default: ''
      },
      rules: {
        type: String,
        default: ''
      },
      rows: {
        type: Number,
        default: 3,
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
  };
  </script>
  
  <style scoped>
  .input {
    width: calc(100% - 8px);
  }
  </style>