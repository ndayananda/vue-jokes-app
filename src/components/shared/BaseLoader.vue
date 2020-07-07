<template>
    <div v-if="isActive" class="base-loader" :class="{'base-loader--mask': isMask, 'base-loader--component': scope === 'component'}">
        <div class="base-loader__container">
            <span class="base-loader__dot"></span>
            <div class="base-loader__dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isMask: {
            type: Boolean,
            default: true
        },
        scope: {
            type: String,
            default: 'page' // possible values [page, component]
        },
        isActive: {
            type: Boolean
        }
    }
}
</script>

<style lang="scss" scoped>
$dots-color: $accent;
$dot-size: 16px;

.base-loader {
    &__container {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 142px;
        height: 40px;
        background: $white;
        filter: contrast(20);
        transform: translate(-50%, -50%);
        z-index: 99;
    }

    &__dot {
        position: absolute;
        width: $dot-size;
        height: $dot-size;
        top: 12px;
        left: 15px;
        filter: blur(4px);
        background: $dots-color;
        border-radius: 50%;
        transform: translateX(0);
        animation: animate-dot 2.8s infinite;
    }

    &__dots {
        transform: translateX(0);
        margin-top: 12px;
        margin-left: 31px;
        animation: animate-dots 2.8s infinite;

        span {
            display: block;
            float: left;
            width: $dot-size;
            height: $dot-size;
            margin-left: $dot-size;
            filter: blur(4px);
            background: $dots-color;
            border-radius: 50%;
        }
    }

    &--mask {
        &:before {
            content: '';
            background: rgba($black, 0.2);
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 98;
        }
    }
}

.base-loader--component {
    &.base-loader {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;

        &--mask {
            &::before {
                position: absolute;
            }
        }

        &__container {
            position: absolute;
        }
    }
}
@keyframes animate-dot {
    50% {
		transform: translateX(96px);
	}

}

@keyframes animate-dots {
    50% {
		transform: translateX(-31px);
	}
}
</style>