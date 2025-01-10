<template>
  <div class="results-data">
    <slot name="label" class="results-item">
      <p>
        {{ label }}
        <span v-if="symbol"> ({{ symbol }})</span>
      </p>
    </slot>

    <slot name="result">
      <span class="results-item">
        {{ result }}
      </span>
    </slot>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.results-data {
  margin: 0.5rem 0;
}

.results-data p {
  color: var(--hint-app);
  font-size: 15px;
}

.results-item {
  font-weight: 700;
  font-size: 1.8rem;
}

@media (max-width: 1290px) {
  .results-data p,
  .results-title {
    font-size: 1rem;
  }

  .results-item {
    font-size: 1.5rem;
  }
}
</style>
