<template>
    <div class="input-wrapper">
      <label v-if="label" :for="label">{{ label }}</label>
      <input
        :id="label"
        :type="type"
        :value="value"
        :disabled="disabled"
        @input="$emit('input', $event.target.value)"
        :class="{ 'error': error }"
        class="input"
      >
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
      type: {
        type: String,
        default: 'text'
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
      disabled: {
        type: Boolean,
        default: false
      }
    },
  };
  </script>
  
  <style scoped>
  .input {
    height: 25px;
    width: calc(100% - 8px);
  }
  </style>