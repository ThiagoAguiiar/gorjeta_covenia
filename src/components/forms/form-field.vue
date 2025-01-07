<template>
  <div class="margin">
    <label for="name">{{ label }}</label>

    <template v-if="type === 'switch'">
      <div class="flexis spacing">
        <span class="hint" v-if="Array.isArray(hint)">{{ hint[0] }}</span>

        <VSwitch
          inset
          v-model="value"
          color="blue-darken-4"
          @update:model-value="updateValue"
          hide-details
        />

        <span class="hint" v-if="Array.isArray(hint)">{{ hint[1] }}</span>
      </div>
    </template>

    <template v-else-if="type === 'number' || type === 'text'">
      <span class="hint hint-spacing">
        {{ Array.isArray(hint) ? hint[0] : hint }}
      </span>

      <div class="spacing">
        <VTextField
          v-model="value"
          :type="type"
          color="blue-darken-4"
          @update:model-value="updateValue"
          hide-details
        />
      </div>
    </template>

    <template v-else-if="type === 'range'">
      <div :class="[Array.isArray(hint) && 'flexis']">
        <span class="hint" v-if="Array.isArray(hint)">{{ hint[0] }}</span>

        <VSlider
          v-model="(value as string | number)"
          :max="rangeMinMax[1]"
          :min="rangeMinMax[0]"
          :step="rangeStep"
          hide-details
          thumb-label
          @update:model-value="updateValue"
          color="blue-darken-4"
        />

        <span class="hint" v-if="Array.isArray(hint)">{{ hint[1] }}</span>

        <span v-else class="hint hint-spacing">
          {{ hint }}
        </span>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, type PropType } from "vue";

const emits = defineEmits(["update:modelValue"]);

type FieldsType = "switch" | "number" | "text" | "range";
type ModelValueType = string | boolean | number;

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Boolean, Number] as PropType<ModelValueType>,
    required: true,
  },
  type: {
    type: String as PropType<FieldsType>,
    default: "text",
  },
  hint: {
    type: Array as PropType<Array<string> | String>,
    default: "",
  },
  rangeMinMax: {
    type: Array as PropType<number[]>,
    default: () => [10, 20],
  },
  rangeStep: {
    type: Number,
    default: 0.1,
  },
});

const value = ref(props.modelValue);

const updateValue = () => {
  emits("update:modelValue", value.value);
};

watch(
  () => props.modelValue,
  () => (value.value = props.modelValue)
);
</script>

<style scoped>
.flexis {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.margin {
  margin-top: 1.2rem;
  padding-bottom: 0.5rem;
}

.hint {
  font-size: 13px;
  font-weight: 500;
}

label {
  font-weight: 500;
  font-size: 16px;
}

.spacing {
  margin-top: 0.5rem;
}

.hint-spacing {
  display: block;
  margin-top: 0.25rem;
}
</style>
