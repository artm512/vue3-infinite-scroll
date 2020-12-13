<template>
  <div :class="$style.list">{{ test }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListInfinite",
  setup() {
    const test = "LISTです";

    return { test };
  }
});
</script>

<style module lang="scss">
.list {
  background: rgba(0, 0, 0, 0.2);
}
</style>
