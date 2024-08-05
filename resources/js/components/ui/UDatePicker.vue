<template>
    <div class="input-wrapper">
      <label v-if="label" :for="label">{{ label }}</label>
      <date-picker 
            :id="label"
            v-model="localValue" 
            :disabled="disabled"
            :class="{ 'error': error }"
            class="input"
        />
      <div v-if="error" class="error-message">{{ error }}</div>
    </div>
  </template>
  
<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

  export default {
    components: {DatePicker},
    model:{
      prop: 'value',
      event: 'change'
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
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
        localValue: {
            get() {
                return this.value
            },
            set(value)  {
                this.$emit('change', value)
            }
        }
    }
  };
  </script>
  
  <style scoped>
  .input {
    height: 25px;
    width: calc(100% - 8px);
  }
  </style>