<template>
  <div class="rule">
    <div class="rule__heading">
      <span class="rule__font rule__font--heading">
        <slot name="heading"></slot>
      </span>
    </div>

    <div class="rule__status">
      <svg v-show="isValid" class="rule__icon rule__icon--ok" width="800px" height="800px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="okIconTitle" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="currentColor"><polyline points="4 13 9 18 20 7"/> </svg>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    isValid: {
      type: Boolean,
      required: true,
      default: false,
    }
  })
</script>

<style lang="scss" scoped>
  .rule {
    
    &__font {
      &--heading {
        font-size: 20px;
      }
    }
    
    &__icon {
      &--ok {
        width: 14px;
        height: 14px;
        color: darkgreen;
      }
    }
  }
</style>