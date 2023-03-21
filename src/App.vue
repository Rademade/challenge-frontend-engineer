<template>
  <div class="layout">
    <div class="layout__content">
      <Field class="layout__field" />
    </div>
  </div>
</template>

<script setup>
import { RULE } from "@/domain/password/rules";
import Field from "@/components/Field.vue"

</script>

<style lang="scss" scoped>
.layout {
  background: #e3e3e3;

  &__content {
    min-height: 100vh;
    padding: 50px;
  }

  &__field {
    display: flex;
    flex-direction: column;
  }
}
</style>

