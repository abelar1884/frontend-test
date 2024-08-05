<template>
    <form class="form" @submit.prevent="submitForm">
      <slot></slot>
      <slot name="submit-button">
        <button type="submit" class="button button_blue">{{ submitText }}</button>
      </slot>
    </form>
</template>

<script>
export default {
    props: {
        submitText: {
            type: String,
            default: 'Submit'
        }
    },
    methods: {
        submitForm() {
            this.$emit('submit')
        }
    },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>