<template>
  <ul class="flex flex-wrap" :class="$style.list">
    <li v-for="dog in state.dogData" :key="dog.id" :class="$style.card">
      <div :class="$style.card__picture">
        <img :src="dog.url" :alt="dog.dogBreed" />
      </div>
      <span :class="$style.card__dogBreed">{{ dog.dogBreed }}</span>
    </li>
  </ul>
  <div ref="refsObserveElement"></div>
  <div v-if="loading" :class="$style.loader">Loading...</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import axios, { AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";

import { dogDataType } from "../types/dogData";

export default defineComponent({
  name: "ListInfinite",
  setup() {
    /**
     * state
     */
    const loading = ref<boolean>(false);
    const complateRendering = ref<boolean>(false);
    const refsObserveElement = ref<HTMLImageElement | undefined>(); // スクロール監視用
    const state = reactive<{ dogData: Array<dogDataType> }>({
      dogData: []
    });

    /**
     * set dog's data
     */
    const setData = (response: AxiosResponse) => {
      response.data.message.map((url: string) => {
        const breedName = url.match(
          /https:\/\/images\.dog\.ceo\/breeds\/(\w+-?\w+)\/.+/
        );
        state.dogData = [
          ...state.dogData,
          {
            id: uuidv4(),
            dogBreed: breedName?.[1],
            url
          }
        ];
      });
    };

    /**
     * fetch dog's data
     */
    const fetchGetData = () => {
      loading.value = true;
      complateRendering.value = false;
      axios
        .get("https://dog.ceo/api/breeds/image/random/10")
        .then(response => {
          setData(response);
        })
        .catch(error => console.log(error))
        .finally(() => {
          loading.value = false;
          complateRendering.value = true;
        });
    };

    const init = () => {
      fetchGetData();
    };

    onMounted(() => {
      const observer = new IntersectionObserver(entries => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          if (!complateRendering.value) return; // 読み込みが終わっていない場合
          fetchGetData();
        }
      });
      const observeElement = refsObserveElement.value;
      if (observeElement) observer.observe(observeElement);
    });

    init();
    return { state, loading, complateRendering, refsObserveElement };
  }
});
</script>

<style module lang="scss">
$listWidth: 960px;
$listGap: 20px;

.list {
  box-sizing: border-box;
  // display: flex; // 試しにtailwind置き換え
  // flex-wrap: wrap; // 試しにtailwind置き換え
  list-style-type: none;
  margin: 0 auto $listGap;
  padding: 0 $listGap;
  width: $listWidth;
}

.card {
  border-radius: 3px;
  box-shadow: 0px 8px 16px -2px rgba(#0a0a0a, 0.1),
    0px 0px 0px 1px rgba(#0a0a0a, 0.02);
  padding: 10px;
  width: ($listWidth - $listGap * 4) / 3;

  &:not(:nth-of-type(3n + 1)) {
    margin-left: $listGap;
  }

  &:nth-of-type(n + 4) {
    margin-top: $listGap;
  }
}

.card__picture {
  align-items: center;
  background: rgba(#000000, 0.1);
  display: flex;
  height: 200px;
  justify-content: center;
  margin-bottom: 10px;

  & > img {
    height: auto;
    max-width: 100%;
    max-height: 100%;
    width: auto;
  }
}

.card__dogBreed {
  font-family: "Indie Flower", cursive;
  font-size: 20px;
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
      1.8em -1.8em 0 0em rgba(#303f5a, 0.2), 2.5em 0em 0 0em rgba(#303f5a, 0.2),
      1.75em 1.75em 0 0em rgba(#303f5a, 0.2), 0em 2.5em 0 0em rgba(#303f5a, 0.2),
      -1.8em 1.8em 0 0em rgba(#303f5a, 0.2), -2.6em 0em 0 0em rgba(#303f5a, 0.5),
      -1.8em -1.8em 0 0em rgba(#303f5a, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(#303f5a, 0.7),
      1.8em -1.8em 0 0em #303f5a, 2.5em 0em 0 0em rgba(#303f5a, 0.2),
      1.75em 1.75em 0 0em rgba(#303f5a, 0.2), 0em 2.5em 0 0em rgba(#303f5a, 0.2),
      -1.8em 1.8em 0 0em rgba(#303f5a, 0.2), -2.6em 0em 0 0em rgba(#303f5a, 0.2),
      -1.8em -1.8em 0 0em rgba(#303f5a, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(#303f5a, 0.5),
      1.8em -1.8em 0 0em rgba(#303f5a, 0.7), 2.5em 0em 0 0em #303f5a,
      1.75em 1.75em 0 0em rgba(#303f5a, 0.2), 0em 2.5em 0 0em rgba(#303f5a, 0.2),
      -1.8em 1.8em 0 0em rgba(#303f5a, 0.2), -2.6em 0em 0 0em rgba(#303f5a, 0.2),
      -1.8em -1.8em 0 0em rgba(#303f5a, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(#303f5a, 0.2),
      1.8em -1.8em 0 0em rgba(#303f5a, 0.5), 2.5em 0em 0 0em rgba(#303f5a, 0.7),
      1.75em 1.75em 0 0em #303f5a, 0em 2.5em 0 0em rgba(#303f5a, 0.2),
      -1.8em 1.8em 0 0em rgba(#303f5a, 0.2), -2.6em 0em 0 0em rgba(#303f5a, 0.2),
      -1.8em -1.8em 0 0em rgba(#303f5a, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(#303f5a, 0.2),
      1.8em -1.8em 0 0em rgba(#303f5a, 0.2), 2.5em 0em 0 0em rgba(#303f5a, 0.5),
      1.75em 1.75em 0 0em rgba(#303f5a, 0.7), 0em 2.5em 0 0em #303f5a,
      -1.8em 1.8em 0 0em rgba(#303f5a, 0.2), -2.6em 0em 0 0em rgba(#303f5a, 0.2),
      -1.8em -1.8em 0 0em rgba(#303f5a, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(#303f5a, 0.2),
      1.8em -1.8em 0 0em rgba(#303f5a, 0.2), 2.5em 0em 0 0em rgba(#303f5a, 0.2),
      1.75em 1.75em 0 0em rgba(#303f5a, 0.5), 0em 2.5em 0 0em rgba(#303f5a, 0.7),
      -1.8em 1.8em 0 0em #303f5a, -2.6em 0em 0 0em rgba(#303f5a, 0.2),
      -1.8em -1.8em 0 0em rgba(#303f5a, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(#303f5a, 0.2),
      1.8em -1.8em 0 0em rgba(#303f5a, 0.2), 2.5em 0em 0 0em rgba(#303f5a, 0.2),
      1.75em 1.75em 0 0em rgba(#303f5a, 0.2), 0em 2.5em 0 0em rgba(#303f5a, 0.5),
      -1.8em 1.8em 0 0em rgba(#303f5a, 0.7), -2.6em 0em 0 0em #303f5a,
      -1.8em -1.8em 0 0em rgba(#303f5a, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(#303f5a, 0.2),
      1.8em -1.8em 0 0em rgba(#303f5a, 0.2), 2.5em 0em 0 0em rgba(#303f5a, 0.2),
      1.75em 1.75em 0 0em rgba(#303f5a, 0.2), 0em 2.5em 0 0em rgba(#303f5a, 0.2),
      -1.8em 1.8em 0 0em rgba(#303f5a, 0.5), -2.6em 0em 0 0em rgba(#303f5a, 0.7),
      -1.8em -1.8em 0 0em #303f5a;
  }
}
@keyframes loading {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #303f5a,
      1.8em -1.8em 0 0em rgba(#303f5a, 0.2), 2.5em 0em 0 0em rgba(#303f5a, 0.2),
      1.75em 1.75em 0 0em rgba(#303f5a, 0.2), 0em 2.5em 0 0em rgba(#303f5a, 0.2),
      -1.8em 1.8em 0 0em rgba(#303f5a, 0.2), -2.6em 0em 0 0em rgba(#303f5a, 0.5),
      -1.8em -1.8em 0 0em rgba(#303f5a, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(#303f5a, 0.7),
      1.8em -1.8em 0 0em #303f5a, 2.5em 0em 0 0em rgba(#303f5a, 0.2),
      1.75em 1.75em 0 0em rgba(#303f5a, 0.2), 0em 2.5em 0 0em rgba(#303f5a, 0.2),
      -1.8em 1.8em 0 0em rgba(#303f5a, 0.2), -2.6em 0em 0 0em rgba(#303f5a, 0.2),
      -1.8em -1.8em 0 0em rgba(#303f5a, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(#303f5a, 0.5),
      1.8em -1.8em 0 0em rgba(#303f5a, 0.7), 2.5em 0em 0 0em #303f5a,
      1.75em 1.75em 0 0em rgba(#303f5a, 0.2), 0em 2.5em 0 0em rgba(#303f5a, 0.2),
      -1.8em 1.8em 0 0em rgba(#303f5a, 0.2), -2.6em 0em 0 0em rgba(#303f5a, 0.2),
      -1.8em -1.8em 0 0em rgba(#303f5a, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(#303f5a, 0.2),
      1.8em -1.8em 0 0em rgba(#303f5a, 0.5), 2.5em 0em 0 0em rgba(#303f5a, 0.7),
      1.75em 1.75em 0 0em #303f5a, 0em 2.5em 0 0em rgba(#303f5a, 0.2),
      -1.8em 1.8em 0 0em rgba(#303f5a, 0.2), -2.6em 0em 0 0em rgba(#303f5a, 0.2),
      -1.8em -1.8em 0 0em rgba(#303f5a, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(#303f5a, 0.2),
      1.8em -1.8em 0 0em rgba(#303f5a, 0.2), 2.5em 0em 0 0em rgba(#303f5a, 0.5),
      1.75em 1.75em 0 0em rgba(#303f5a, 0.7), 0em 2.5em 0 0em #303f5a,
      -1.8em 1.8em 0 0em rgba(#303f5a, 0.2), -2.6em 0em 0 0em rgba(#303f5a, 0.2),
      -1.8em -1.8em 0 0em rgba(#303f5a, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(#303f5a, 0.2),
      1.8em -1.8em 0 0em rgba(#303f5a, 0.2), 2.5em 0em 0 0em rgba(#303f5a, 0.2),
      1.75em 1.75em 0 0em rgba(#303f5a, 0.5), 0em 2.5em 0 0em rgba(#303f5a, 0.7),
      -1.8em 1.8em 0 0em #303f5a, -2.6em 0em 0 0em rgba(#303f5a, 0.2),
      -1.8em -1.8em 0 0em rgba(#303f5a, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(#303f5a, 0.2),
      1.8em -1.8em 0 0em rgba(#303f5a, 0.2), 2.5em 0em 0 0em rgba(#303f5a, 0.2),
      1.75em 1.75em 0 0em rgba(#303f5a, 0.2), 0em 2.5em 0 0em rgba(#303f5a, 0.5),
      -1.8em 1.8em 0 0em rgba(#303f5a, 0.7), -2.6em 0em 0 0em #303f5a,
      -1.8em -1.8em 0 0em rgba(#303f5a, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(#303f5a, 0.2),
      1.8em -1.8em 0 0em rgba(#303f5a, 0.2), 2.5em 0em 0 0em rgba(#303f5a, 0.2),
      1.75em 1.75em 0 0em rgba(#303f5a, 0.2), 0em 2.5em 0 0em rgba(#303f5a, 0.2),
      -1.8em 1.8em 0 0em rgba(#303f5a, 0.5), -2.6em 0em 0 0em rgba(#303f5a, 0.7),
      -1.8em -1.8em 0 0em #303f5a;
  }
}
</style>
