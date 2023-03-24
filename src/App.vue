<template>
  <div class="layout">
    <div class="layout__content">
      <Field
        :fieldParams="params"
        :field-errors="errors"
        class="layout__field"
        :errors-data="rules"
      />
    </div>
  </div>
</template>

<script setup>
import { RULE, RulesErrorLexicon } from "@/domain/password/rules";
import Field from "@/components/FormField.vue";
import { reactive } from "vue";

const params = {
  name: "password",
  testSelector: "password-field",
  type: "text",
  isPasswordField: true,
};

let errors = {
  OneLetter: false,
  UpperAndLower: false,
  OneNumber: false,
  SpecialSymbol: false,
  LongerThan4: false,
  LongerThan8: false,
  LongerThan12: false,
};

let rules = {
  RULE,
  RulesErrorLexicon,
};
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
