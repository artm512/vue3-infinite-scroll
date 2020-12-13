<template>
  <h1 :class="$style.title">{{ title }}</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Title",
  props: {
    apiName: {
      type: String
    }
  },
  setup(props) {
    const title = `${props.apiName}' LIST`;

    return { title };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap");

.title {
  font-family: "Indie Flower", cursive;
}
</style>
