import { describe, it, beforeEach, expect } from "vitest";
import { createPinia, setActivePinia } from "pinia/dist/pinia";
import { useStrongPasswordStore } from "@/stores/strong-password";

describe('Password', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    });

    it('At least one letter', () => {
        const strongPasswordStore = useStrongPasswordStore();
        const oneLetter = strongPasswordStore.rules.find(rule => rule.name === 'OneLetter');

        const expectTruthy = ['a', 'B', 'abc', '1a2s', 'AAbb', 'Mot%!'];
        const expectFalsy = ['', 1, '%', '1@3'];

        expectTruthy.forEach(passwordCanidate => {
            strongPasswordStore.password = passwordCanidate;
            strongPasswordStore.validateInput();
            expect(oneLetter.isCorrect).toBeTruthy();
        })

        expectFalsy.forEach(passwordCanidate => {
            strongPasswordStore.password = passwordCanidate;
            strongPasswordStore.validateInput();
            expect(oneLetter.isCorrect).toBeFalsy();
        })
    })
})