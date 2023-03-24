<template>
  <div class="field">
    <input
      :name="fieldParams.name"
      v-bind="formData.data"
      class="field__input field__validator"
      :data-test="fieldParams.testSelector"
      v-on="validationListeners"
      :value="value"
      :type="fieldParams.type"
    />

    <div class="field__rules">
      <Rule
        v-for="(value, rule, index) in errors"
        :key="index"
        class="field__rule"
        :rule="rule"
        :class="[
          { 'field__rule--valid': value },
          { 'field__rule--inValid': !value },
        ]"
        :isValid="value"
      >
        <template #heading>
          <span
            :data-test-rule-indicator="rule"
            :class="[
              { 'rule-validator--valid': value },
              { 'rule-validator--inValid': !value },
            ]"
            class="field__font field__font--heading rule-validator"
          >
            {{ rule }}
          </span>
        </template>
      </Rule>
    </div>

    <div v-if="fieldParams.isPasswordField" class="field__rating">
      <span
        v-if="formData.passwordRating !== null"
        data-test="validation-summary"
        class="field__font field__font--rating"
      >
        {{ formData.passwordRatingText }}
      </span>
    </div>

    <div class="field__error">
      <span class="field__font field__font--message">
        {{ formData.singleErrorMessage }}
      </span>
    </div>
  </div>
</template>

<script setup>
import Rule from "@/components/FieldRule.vue";
import {
  StrengthOption,
  StrengthOptionLabel,
} from "@/domain/password/strength-options";

import { reactive, computed } from "vue";
import { useField } from "vee-validate";

let formData = reactive({
  data: null,
  passwordRating: null,
  passwordRatingText: "",
  singleErrorMessage: "",
});

const props = defineProps({
  fieldParams: {
    type: Object,
    default: () => {},
    required: true,
  },

  fieldErrors: {
    type: Object,
    default: () => {},
    required: false,
  },

  errorsData: {
    type: Object,
    default: () => {},
    required: true,
  },
});

const errors = reactive(props.fieldErrors);
const errorsData = reactive(props.errorsData);

function validateField(value) {
  if (value) {
    for (const key of Object.keys(errors)) {
      errors[key] = isRegexMatch(errorsData.RULE[key], value);
    }

    if (props.fieldParams.isPasswordField) countRating();
  } else {
    resetForm();
  }
}

function resetForm() {
  for (const key of Object.keys(errors)) {
    errors[key] = false;
    formData.singleErrorMessage = "all rules failed";
    formData.passwordRating = null;
  }
}

function countRating() {
  let total = 0;
  let arr = [];

  for (const [key, val] of Object.entries(errors)) {
    if (val) {
      total++;
    }

    if (errors[key] === false) {
      arr.push(errorsData.RulesErrorLexicon[key]);
    }
  }

  if (total === 0) {
    formData.singleErrorMessage = errorsData.RulesErrorLexicon.default;
  }

  if (total < 5) {
    formData.passwordRating = StrengthOption.Weak;
  } else if (total >= 5) {
    formData.passwordRating = StrengthOption.Strong;
  }

  arr.length === 0
    ? (formData.singleErrorMessage = errorsData.RulesErrorLexicon.Exact)
    : (formData.singleErrorMessage = arr[0]);

  formData.passwordRatingText = StrengthOptionLabel[formData.passwordRating];
}

const { errorMessage, value, handleChange } = useField(
  "password",
  validateField,
  {
    validateOnValueUpdate: true,
  }
);

function isRegexMatch(regex, val) {
  let result = null;

  try {
    result = val.match(regex) !== null;
  } catch (e) {
    console.error(e);
    console.error("Field.validateField() - wrong error key");
  }

  return result;
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

    &--heding {
    }

    &--rating {
    }

    &--message {
      color: red;
      text-transform: uppercase;
    }
  }
}
</style>
