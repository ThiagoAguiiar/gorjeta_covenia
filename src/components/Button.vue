<template>
  <button class="btn-tab" @click="$emit('click')">
    <Icon :icon="setDirectionArrow()" width="22px" color="white" />
  </button>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

defineEmits(["click"]);

const props = defineProps({
  direction: {
    type: String as PropType<"left" | "right">,
    default: "left",
  },
});

const setDirectionArrow = () => {
  if (props.direction === "left") {
    return "fluent:chevron-left-24-regular";
  }

  return "fluent:chevron-right-24-regular";
};
</script>
