<template>
  <h1 :class="$style.title">{{ title }}</h1>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

// TODO: 2重で型定義しないといけない？？？
type Props = {
  apiName: string;
};

export default defineComponent({
  name: "Title",
  props: {
    apiName: {
      type: String,
      required: true
    }
  },
  setup(props: Props) {
    const title = computed(() => `${props.apiName} DEMO`);

    return { title };
  }
});
</script>

<style module lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap");

.title {
  font-family: "Indie Flower", cursive;
  font-size: 36px;
  margin-bottom: 20px;
  min-width: 960px;
  text-align: center;
}
</style>
