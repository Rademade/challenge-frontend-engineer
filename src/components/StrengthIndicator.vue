<template>
    <div class="cmp-strength-indicator">
        <div class="cmp-strength-indicator__label">Your password is <span>{{ message }}</span></div>
        <div class="cmp-strength-indicator__wrapper">
            <div class="cmp-strength-indicator__level" :class="indicatorClasses"></div>
            <div class="cmp-strength-indicator__level" :class="{'cmp-strength-indicator__level--strong': strongPasswordStore.isPasswordStrong}"></div>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useStrongPasswordStore } from "@/stores/strong-password";

    const strongPasswordStore = useStrongPasswordStore();

    const message = computed(() => {
        if (strongPasswordStore.isPasswordStrong) {
            return 'strong';
        } else if (strongPasswordStore.isPasswordWeak) {
            return 'weak';
        } else return 'uncorrect';
    })

    const indicatorClasses = computed(() => {
        if (strongPasswordStore.isPasswordWeak) {
            return 'cmp-strength-indicator__level--weak';
        } else if (strongPasswordStore.isPasswordStrong) {
            return 'cmp-strength-indicator__level--strong'
        }
    })
</script>

<style lang="scss" scoped>
    .cmp-strength-indicator {
        margin-top: 20px;
    }
    .cmp-strength-indicator__label {
        text-align: right;

        span {
            font-weight: 700;
        }
    }
    .cmp-strength-indicator__wrapper {
        display: flex;
        gap: 5px;
        margin-top: 10px;
    }

    .cmp-strength-indicator__level {
        height: 3px;
        width: 100%;
        background-color: $color-indicator;
        border-radius: 3px;
        transition: background-color 0.3s ease-in-out;

        &--weak {
            background-color: $color-yellow;
        }

        &--strong {
            background-color: $color-green;
        }
    }
</style>