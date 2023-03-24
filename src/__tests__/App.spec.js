import { describe, it, beforeEach, expect } from "vitest";
import { mount } from "@vue/test-utils";

import App from "@/App.vue";
import { createPinia } from "pinia/dist/pinia";
import { RulesErrorLexicon } from "@/domain/password/rules";
import { useStrongPasswordStore } from "@/stores/strong-password";
import {
  StrengthOption,
  StrengthOptionLabel,
} from "../domain/password/strength-options";

// const RULE_INDICATOR_CLASS = {
//   pass: "rule-validator--valid",
//   fail: "rule-validator--inValid",
// };

describe("App", () => {
  let wrapper;

  const setPasswordTo = (password) => {
    return wrapper.get('[data-test="password-field"]').setValue(password);
  };

  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        plugins: [createPinia()],
      },
    });
    useStrongPasswordStore();
  });

  it("should render", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("rules indicators", () => {
    const NOT_EXCLUSIVE_SPEC_SYMBOLS_LIST = "$%^& _-+*()@!";

    const examples = [
      {
        password: "",
        passedRules: [],
        description: "all rules failed",
      },
      {
        password: "A",
        passedRules: [RulesErrorLexicon.OneLetter],
        description: "one character",
      },
      {
        password: "Ab",
        passedRules: [
          RulesErrorLexicon.OneLetter,
          RulesErrorLexicon.UpperAndLower,
        ],
        description: "upper and lower char",
      },
      {
        password: "3a33",
        passedRules: [RulesErrorLexicon.OneLetter, RulesErrorLexicon.OneNumber],
        description: "upper and lower char",
      },
      ...NOT_EXCLUSIVE_SPEC_SYMBOLS_LIST.split("").map((specialChar) => ({
        password: `a${specialChar}p`,
        passedRules: [
          RulesErrorLexicon.SpecialSymbol,
          RulesErrorLexicon.OneLetter,
        ],
        description: "special char",
      })),
      {
        password: "aaaa",
        passedRules: [RulesErrorLexicon.OneLetter],
        description: "one character",
      },
      {
        password: "aaaae",
        passedRules: [
          RulesErrorLexicon.OneLetter,
          RulesErrorLexicon.LongerThan4,
        ],
        description: "longer than 4",
      },
      {
        password: "ab123",
        passedRules: [
          RulesErrorLexicon.OneLetter,
          RulesErrorLexicon.OneNumber,
          RulesErrorLexicon.LongerThan4,
        ],
        description: "longer than 4",
      },
      {
        password: "###!!~~)",
        passedRules: [
          RulesErrorLexicon.SpecialSymbol,
          RulesErrorLexicon.LongerThan4,
        ],
        description: "longer than 4",
      },
      {
        password: "Gsasfgasa",
        passedRules: [
          RulesErrorLexicon.OneLetter,
          RulesErrorLexicon.LongerThan4,
          RulesErrorLexicon.LongerThan8,
          RulesErrorLexicon.UpperAndLower,
        ],
        description: "longer than 8",
      },
      {
        password: "1234567890asd",
        passedRules: [
          RulesErrorLexicon.OneLetter,
          RulesErrorLexicon.LongerThan4,
          RulesErrorLexicon.OneNumber,
          RulesErrorLexicon.LongerThan8,
          RulesErrorLexicon.LongerThan12,
        ],
        description: "longer than 12",
      },
      {
        password: "#UpperLowerNumb3rLongEnough!",
        passedRules: Object.values(RulesErrorLexicon),
        description: "all rules satisfied",
      },
    ];

    it.each(examples)(
      'with password set to "$password" should indicate $description',
      async ({ password, passedRules }) => {
        expect.hasAssertions();
        const failedRules = Object.values(RulesErrorLexicon).filter(
          (rule) => !passedRules.includes(rule)
        );

        await setPasswordTo(password);

        passedRules.forEach((rule) => {
          expect(
            wrapper
              .get(`[data-test-rule-indicator="${rule}"]`)
              .classes("rule-validator--valid")
          ).toBe(true);
          expect(
            wrapper
              .get(`[data-test-rule-indicator="${rule}"]`)
              .classes("rule-validator--inValid")
          ).toBe(false);
        });

        failedRules.forEach((rule) => {
          expect(
            wrapper
              .get(`[data-test-rule-indicator="${rule}"]`)
              .classes("rule-validator--valid")
          ).toBe(false);
          expect(
            wrapper
              .get(`[data-test-rule-indicator="${rule}"]`)
              .classes("rule-validator--inValid")
          ).toBe(true);
        });
      }
    );
  });

  describe("strength validation", () => {
    describe("when less than 5 rules satisfied", () => {
      const examples = ["A", "a", "Aa!", "$", "6a!B"];
      it.each(examples)(
        'should indicate password as weak for input "%s"',
        async (password) => {
          await setPasswordTo(password);
          expect(wrapper.get('[data-test="validation-summary"]').text()).toBe(
            StrengthOptionLabel[StrengthOption.Weak]
          );
        }
      );
    });

    describe("when at least 5 rules satisfied", () => {
      const examples = ["6a!Bd", "hugryj#S3", "EMn1fyStr0ngPa$$word"];
      it.each(examples)(
        'should indicate password as strong for input "%s"',
        async (password) => {
          await setPasswordTo(password);
          expect(wrapper.get('[data-test="validation-summary"]').text()).toBe(
            StrengthOptionLabel[StrengthOption.Strong]
          );
        }
      );
    });
  });
});
