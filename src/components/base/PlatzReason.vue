<template>
  <div v-if="text || hasBefore">
    <div v-if="expanded">
      <div class="mb-1">
        <slot name="before" />
      </div>
      <div
        class="my-0 font-monospace reason reason-expanded"
        :class="{ bad: isBad }"
      >
        {{ text }}
      </div>
    </div>

    <template v-else>
      <div class="d-flex flex-row align-items-center">
        <div class="mb-1">
          <slot name="before" />
        </div>
        <div class="reason flex-fill">
          <component
            :is="allowExpand ? 'a' : 'div'"
            class="reason-collapsed font-monospace"
            :class="{ bad: isBad, expandable: allowExpand }"
            @click="expand"
          >
            {{ text }}
          </component>
          <div>&nbsp;</div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.reason {
  position: relative;
}

.reason-collapsed {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--bs-secondary);

  &.bad {
    color: var(--bs-danger);
  }

  &.expandable {
    &:hover {
      opacity: 0.6;
    }
  }
}

.reason-expanded {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;

  &.bad {
    color: var(--bs-danger);
  }
}
</style>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    text: {
      type: String,
      required: false
    },
    isBad: {
      type: Boolean,
      default: false
    },
    autoExpand: {
      type: Boolean,
      default: false
    },
    allowExpand: {
      type: Boolean,
      default: true
    }
  },

  setup(props, { slots }) {
    const user_expanded = ref(false);
    const expanded = computed(() => user_expanded.value || props.autoExpand);

    function expand() {
      if (props.allowExpand) {
        user_expanded.value = true;
      }
    }

    const hasBefore = computed(() => !!slots["before"]);

    return {
      user_expanded,
      expanded,
      expand,
      hasBefore
    };
  }
});
</script>
