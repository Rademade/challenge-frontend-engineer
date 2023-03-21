<template>
  <div class="field">
    <input
      name="password"
      v-bind="formData.password"
      class="field__input"
      data-test="password-field"
      v-on="validationListeners"
      :value="value"
      type="text"
    />

    <div class="field__rules">
      <Rule
        v-for="(value, key, index) in errors"
        :key="index"
        class="field__rule"
        :data-test-rule-indicator="key"
        :class="[{'field__rule--valid': value}, {'field__rule--inValid': !value}]"
        :isValid="value"
      >
        <template #heading>{{ key }}</template>
      </Rule>
    </div>

    <div class="field__rating">
      <span v-if="formData.passwordRating !== null" data-test="validation-summary" class="field__font field__font--rating">
        {{ formData.passwordRatingText }}
      </span>
    </div>

    <span :data-test-rule-indicator="formData.singleErrorMessage" class="field__font field__font--message">{{formData.singleErrorMessage}}</span>

  </div>
</template>

<script setup>
import Rule from "@/components/Rule.vue";
import { RULE, RulesErrorLexicon } from "@/domain/password/rules";
import { StrengthOption, StrengthOptionLabel } from "@/domain/password/strength-options";

import { reactive, computed } from "vue";
import { useField } from 'vee-validate';

let formData = reactive({
  password: null,
  passwordRating: null,
  passwordRatingText: "",
  singleErrorMessage: 'all rules failed',
})

let errors = reactive({
  OneLetter: false,
  UpperAndLower: false,
  OneNumber: false,
  SpecialSymbol: false,
  LongerThan4: false,
  LongerThan8: false,
  LongerThan12: false,
})

function validateField(value) {
  if (value) {
    errors.OneLetter = isRegexMatch(RULE.OneLetter, value);
    errors.UpperAndLower = isRegexMatch(RULE.UpperAndLower, value);
    errors.OneNumber = isRegexMatch(RULE.OneNumber, value);
    errors.SpecialSymbol = isRegexMatch(RULE.SpecialSymbol, value);
    errors.LongerThan4 = isRegexMatch(RULE.LongerThan4, value);
    errors.LongerThan8 = isRegexMatch(RULE.LongerThan8, value);
    errors.LongerThan12 = isRegexMatch(RULE.LongerThan12, value);

    countRating();
  }

  return true;
}

function countRating() {
  let total = 0;
  let arr = [];

  for (const [key, val] of Object.entries(errors)) {
    if (val)  {
      total++;
    }

    if (errors[key] === false) {
      arr.push(RulesErrorLexicon[key]);
    }
  }

  if (total === 0) {
    formData.singleErrorMessage = RulesErrorLexicon.default;
  }

  if (total < 5) {
    formData.passwordRating = StrengthOption.Weak;
  } else if (total >= 5) {
    formData.passwordRating = StrengthOption.Strong;
  }

  arr.length === 0
      ? formData.singleErrorMessage = RulesErrorLexicon.Exact
      : formData.singleErrorMessage = arr[0]

  formData.passwordRatingText = StrengthOptionLabel[formData.passwordRating];
}

const { errorMessage, value, handleChange } = useField(
    'password',
    validateField,
    {
      validateOnValueUpdate: true,
    }
);

function isRegexMatch(regex, val) {
  return val.match(regex) !== null
}

const validationListeners = computed(() => {
  if (!errorMessage.value) {
    return {
      blur: handleChange,
      change: handleChange,
      input: (e) => handleChange(e, false),
    };
  }

  return {
    blur: handleChange,
    change: handleChange,
    input: handleChange,
  };
});
</script>

<style lang="scss" scoped>
.field {
  &__input {
    width: 250px;
    height: 35px;
    padding: 0 15px;
    font-size: 18px;
  }

  &__rules {
    margin-top: 50px;
  }

  &__rule {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
    align-items: center;
    width: 200px;
    margin-bottom: 10px;

    &--valid {
      border-bottom: 1px solid darkgreen;
    }

  }

  &__rating {
    margin-top: 50px;
  }

  &__font {
    font-size: 18px;

    &--rating {
    }

    &--message {
      color: red;
      text-transform: uppercase;
    }
  }
}
</style>
