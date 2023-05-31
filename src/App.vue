<script setup>
import { useStrongPasswordStore } from "@/stores/strong-password";
import StrengthIndicator from "./components/strengthIndicator.vue";

const strongPasswordStore = useStrongPasswordStore();
</script>

<template>
  <div class="password-challenge">
    <input
      class="password-challenge__input"
      v-model="strongPasswordStore.password"
      @input="strongPasswordStore.validateInput"
      placeholder="Type your password"
      type="password"
    />

    <ul class="password-challenge__hints">
      <li
        v-for="rule in strongPasswordStore.rules"
        :key="rule.name"
        class="password-challenge__hints-rule"
        :class="{'password-challenge__hints-rule--passed': rule.isCorrect}"
      >

        <transition name="reduce" class="password-challenge__hints-rule-icon" mode="out-in">
          <i v-if="!rule.isCorrect" class="icon-notPassedIcon"></i>
          <i v-else class="icon-passedIcon"></i>
        </transition>

        <div class="password-challenge__hints-rule-label">{{ rule.label }}</div>
      </li>
    </ul>

    <StrengthIndicator/>
  </div>
</template>

<style scoped lang="scss">  
  .password-challenge {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    margin: 0 auto;
    padding: 30px;
    max-width: 600px;
    font-family: Trebuchet MS, Tahoma, Arial, sans-serif;
  }

  .password-challenge__input {
    padding: 10px;
    border-radius: 10px;
    border: 1px solid $color-lightgray;
    font-family: Trebuchet MS, Tahoma, Arial, sans-serif;
    font-size: 18px;

    &:focus-visible {
      outline: 1px solid $color-lightgray;
    }

    &::placeholder {
      color: $color-lightgray;
    }
  }

  .password-challenge__hints {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .password-challenge__hints-rule {
    display: flex;
    gap: 10px;
    align-items: center;
    color: $color-red;
    transition: color 0.3s ease-in-out;

    &--passed {
      color: $color-green;
    }
  }

  .password-challenge__hints-rule-icon {
    display: flex;
  }
</style>
