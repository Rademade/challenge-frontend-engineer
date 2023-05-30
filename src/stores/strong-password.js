import { defineStore } from "pinia";

export const useStrongPasswordStore = defineStore("strong_password", {
  state: () => ({
    password: '',
    rules: [
      {
        name: 'OneLetter',
        pattern: /[a-zA-z]/,
        label: 'Has at least one letter',
        isCorrect: false
      },
      {
        name: 'UpperAndLower',
        pattern: /(?=.*[a-z])(?=.*[A-Z])/,
        label: 'Has at least one lower and one upper case letter',
        isCorrect: false
      },
      {
        name: 'OneNumber',
        pattern: /\d/,
        label: 'Has at least one number',
        isCorrect: false
      },
      {
        name: 'SpecialSymbol',
        pattern: /[^\w]/,
        label: 'Has at least one special character',
        isCorrect: false
      },
      {
        name: 'LongerThan4',
        pattern: /.{5,}/,
        label: 'Has length > 4',
        isCorrect: false
      },
      {
        name: 'LongerThan8',
        pattern: /.{9,}/,
        label: 'Has length > 8',
        isCorrect: false
      },
      {
        name: 'LongerThan12',
        pattern: /.{13,}/,
        label: 'Has length > 12',
        isCorrect: false
      },
    ]
  }),

  getters: {
    countPassedRules: (state) => state.rules.filter(rule => rule.isCorrect).length,
    isPasswordStrong() {
      return this.countPassedRules >= 5;
    },
    isPasswordWeak() {
      return !!this.countPassedRules && this.countPassedRules < 5;
    }
  },

  actions: {
    validateInput() {
      this.rules.forEach(rule => {
        rule.pattern.test(this.password) ? rule.isCorrect = true : rule.isCorrect = false;
      });
    }
  }
});
