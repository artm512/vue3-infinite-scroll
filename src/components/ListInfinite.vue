<template>
  <ul :class="$style.list">
    <li v-for="dog in dogData" :key="dog.url" :class="$style.card">
      <span :class="$style.breed">{{ dog.breed }}</span>
      <img :src="dog.url" :alt="dog.breed" />
    </li>
  </ul>
  <div v-if="loading" :class="$style.loader">Loading...</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  name: "ListInfinite",
  setup() {
    const loading = ref(false);
    const dogData = reactive([{}]);

    const fetchGetData = (url: string) => {
      loading.value = true;
      axios
        .get(url)
        .then(response => {
          response.data.message.map((url: string) => {
            const breed = url.match(
              /https:\/\/images\.dog\.ceo\/breeds\/(\w+-?\w+)\/.+/
            );
            dogData.push({
              id: uuidv4(),
              breed: breed?.[1],
              url
            });
          });
        })
        .catch(error => console.log(error))
        .finally(() => {
          loading.value = false;
        });
    };

    const setData = async () => {
      await fetchGetData("https://dog.ceo/api/breeds/image/random/10");
    };

    const init = () => {
      setData();
    };

    init();
    return { dogData, loading };
  }
});
</script>

<style module lang="scss">
$listWidth: 960px;
$listGap: 20px;

.list {
  background: rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  margin: auto;
  padding: 0 $listGap;
  width: $listWidth;
}

.card {
  width: ($listWidth - $listGap * 4) / 3;

  &:not(:nth-of-type(3n + 1)) {
    margin-left: $listGap;
  }

  &:nth-of-type(n + 4) {
    margin-top: $listGap;
  }

  img {
    width: 100%;
  }
}

// ローディングアイコン
.loader {
  margin: 100px auto;
  font-size: 15px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  animation: loading 1.1s infinite ease;
  transform: translateZ(0);
}
@-webkit-keyframes loading {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #303f5a,
      1.8em -1.8em 0 0em rgba(48, 63, 90, 0.2),
      2.5em 0em 0 0em rgba(48, 63, 90, 0.2),
      1.75em 1.75em 0 0em rgba(48, 63, 90, 0.2),
      0em 2.5em 0 0em rgba(48, 63, 90, 0.2),
      -1.8em 1.8em 0 0em rgba(48, 63, 90, 0.2),
      -2.6em 0em 0 0em rgba(48, 63, 90, 0.5),
      -1.8em -1.8em 0 0em rgba(48, 63, 90, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(48, 63, 90, 0.7),
      1.8em -1.8em 0 0em #303f5a, 2.5em 0em 0 0em rgba(48, 63, 90, 0.2),
      1.75em 1.75em 0 0em rgba(48, 63, 90, 0.2),
      0em 2.5em 0 0em rgba(48, 63, 90, 0.2),
      -1.8em 1.8em 0 0em rgba(48, 63, 90, 0.2),
      -2.6em 0em 0 0em rgba(48, 63, 90, 0.2),
      -1.8em -1.8em 0 0em rgba(48, 63, 90, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(48, 63, 90, 0.5),
      1.8em -1.8em 0 0em rgba(48, 63, 90, 0.7), 2.5em 0em 0 0em #303f5a,
      1.75em 1.75em 0 0em rgba(48, 63, 90, 0.2),
      0em 2.5em 0 0em rgba(48, 63, 90, 0.2),
      -1.8em 1.8em 0 0em rgba(48, 63, 90, 0.2),
      -2.6em 0em 0 0em rgba(48, 63, 90, 0.2),
      -1.8em -1.8em 0 0em rgba(48, 63, 90, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(48, 63, 90, 0.2),
      1.8em -1.8em 0 0em rgba(48, 63, 90, 0.5),
      2.5em 0em 0 0em rgba(48, 63, 90, 0.7), 1.75em 1.75em 0 0em #303f5a,
      0em 2.5em 0 0em rgba(48, 63, 90, 0.2),
      -1.8em 1.8em 0 0em rgba(48, 63, 90, 0.2),
      -2.6em 0em 0 0em rgba(48, 63, 90, 0.2),
      -1.8em -1.8em 0 0em rgba(48, 63, 90, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(48, 63, 90, 0.2),
      1.8em -1.8em 0 0em rgba(48, 63, 90, 0.2),
      2.5em 0em 0 0em rgba(48, 63, 90, 0.5),
      1.75em 1.75em 0 0em rgba(48, 63, 90, 0.7), 0em 2.5em 0 0em #303f5a,
      -1.8em 1.8em 0 0em rgba(48, 63, 90, 0.2),
      -2.6em 0em 0 0em rgba(48, 63, 90, 0.2),
      -1.8em -1.8em 0 0em rgba(48, 63, 90, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(48, 63, 90, 0.2),
      1.8em -1.8em 0 0em rgba(48, 63, 90, 0.2),
      2.5em 0em 0 0em rgba(48, 63, 90, 0.2),
      1.75em 1.75em 0 0em rgba(48, 63, 90, 0.5),
      0em 2.5em 0 0em rgba(48, 63, 90, 0.7), -1.8em 1.8em 0 0em #303f5a,
      -2.6em 0em 0 0em rgba(48, 63, 90, 0.2),
      -1.8em -1.8em 0 0em rgba(48, 63, 90, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(48, 63, 90, 0.2),
      1.8em -1.8em 0 0em rgba(48, 63, 90, 0.2),
      2.5em 0em 0 0em rgba(48, 63, 90, 0.2),
      1.75em 1.75em 0 0em rgba(48, 63, 90, 0.2),
      0em 2.5em 0 0em rgba(48, 63, 90, 0.5),
      -1.8em 1.8em 0 0em rgba(48, 63, 90, 0.7), -2.6em 0em 0 0em #303f5a,
      -1.8em -1.8em 0 0em rgba(48, 63, 90, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(48, 63, 90, 0.2),
      1.8em -1.8em 0 0em rgba(48, 63, 90, 0.2),
      2.5em 0em 0 0em rgba(48, 63, 90, 0.2),
      1.75em 1.75em 0 0em rgba(48, 63, 90, 0.2),
      0em 2.5em 0 0em rgba(48, 63, 90, 0.2),
      -1.8em 1.8em 0 0em rgba(48, 63, 90, 0.5),
      -2.6em 0em 0 0em rgba(48, 63, 90, 0.7), -1.8em -1.8em 0 0em #303f5a;
  }
}
@keyframes loading {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #303f5a,
      1.8em -1.8em 0 0em rgba(48, 63, 90, 0.2),
      2.5em 0em 0 0em rgba(48, 63, 90, 0.2),
      1.75em 1.75em 0 0em rgba(48, 63, 90, 0.2),
      0em 2.5em 0 0em rgba(48, 63, 90, 0.2),
      -1.8em 1.8em 0 0em rgba(48, 63, 90, 0.2),
      -2.6em 0em 0 0em rgba(48, 63, 90, 0.5),
      -1.8em -1.8em 0 0em rgba(48, 63, 90, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(48, 63, 90, 0.7),
      1.8em -1.8em 0 0em #303f5a, 2.5em 0em 0 0em rgba(48, 63, 90, 0.2),
      1.75em 1.75em 0 0em rgba(48, 63, 90, 0.2),
      0em 2.5em 0 0em rgba(48, 63, 90, 0.2),
      -1.8em 1.8em 0 0em rgba(48, 63, 90, 0.2),
      -2.6em 0em 0 0em rgba(48, 63, 90, 0.2),
      -1.8em -1.8em 0 0em rgba(48, 63, 90, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(48, 63, 90, 0.5),
      1.8em -1.8em 0 0em rgba(48, 63, 90, 0.7), 2.5em 0em 0 0em #303f5a,
      1.75em 1.75em 0 0em rgba(48, 63, 90, 0.2),
      0em 2.5em 0 0em rgba(48, 63, 90, 0.2),
      -1.8em 1.8em 0 0em rgba(48, 63, 90, 0.2),
      -2.6em 0em 0 0em rgba(48, 63, 90, 0.2),
      -1.8em -1.8em 0 0em rgba(48, 63, 90, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(48, 63, 90, 0.2),
      1.8em -1.8em 0 0em rgba(48, 63, 90, 0.5),
      2.5em 0em 0 0em rgba(48, 63, 90, 0.7), 1.75em 1.75em 0 0em #303f5a,
      0em 2.5em 0 0em rgba(48, 63, 90, 0.2),
      -1.8em 1.8em 0 0em rgba(48, 63, 90, 0.2),
      -2.6em 0em 0 0em rgba(48, 63, 90, 0.2),
      -1.8em -1.8em 0 0em rgba(48, 63, 90, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(48, 63, 90, 0.2),
      1.8em -1.8em 0 0em rgba(48, 63, 90, 0.2),
      2.5em 0em 0 0em rgba(48, 63, 90, 0.5),
      1.75em 1.75em 0 0em rgba(48, 63, 90, 0.7), 0em 2.5em 0 0em #303f5a,
      -1.8em 1.8em 0 0em rgba(48, 63, 90, 0.2),
      -2.6em 0em 0 0em rgba(48, 63, 90, 0.2),
      -1.8em -1.8em 0 0em rgba(48, 63, 90, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(48, 63, 90, 0.2),
      1.8em -1.8em 0 0em rgba(48, 63, 90, 0.2),
      2.5em 0em 0 0em rgba(48, 63, 90, 0.2),
      1.75em 1.75em 0 0em rgba(48, 63, 90, 0.5),
      0em 2.5em 0 0em rgba(48, 63, 90, 0.7), -1.8em 1.8em 0 0em #303f5a,
      -2.6em 0em 0 0em rgba(48, 63, 90, 0.2),
      -1.8em -1.8em 0 0em rgba(48, 63, 90, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(48, 63, 90, 0.2),
      1.8em -1.8em 0 0em rgba(48, 63, 90, 0.2),
      2.5em 0em 0 0em rgba(48, 63, 90, 0.2),
      1.75em 1.75em 0 0em rgba(48, 63, 90, 0.2),
      0em 2.5em 0 0em rgba(48, 63, 90, 0.5),
      -1.8em 1.8em 0 0em rgba(48, 63, 90, 0.7), -2.6em 0em 0 0em #303f5a,
      -1.8em -1.8em 0 0em rgba(48, 63, 90, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(48, 63, 90, 0.2),
      1.8em -1.8em 0 0em rgba(48, 63, 90, 0.2),
      2.5em 0em 0 0em rgba(48, 63, 90, 0.2),
      1.75em 1.75em 0 0em rgba(48, 63, 90, 0.2),
      0em 2.5em 0 0em rgba(48, 63, 90, 0.2),
      -1.8em 1.8em 0 0em rgba(48, 63, 90, 0.5),
      -2.6em 0em 0 0em rgba(48, 63, 90, 0.7), -1.8em -1.8em 0 0em #303f5a;
  }
}
</style>
