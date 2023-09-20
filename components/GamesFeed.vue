<script setup>
import { useGameStore } from "~/store/games";
const store = useGameStore();
const props = defineProps({
  gameTab: {
    type: String,
    required: true,
  },
});
let timeoutJackpot = null;

const games = computed(() => {
  //Update the current jackpot for appropriate games every few seconds
  fetchJackpotsFewSeconds();
  // Define an array of categories to be used later
  const categoriesOther = ["ball", "fun", "virtual"];
  // Return a filtered list of games based on 'props.gameTab'
  return store.games.filter((game) => {
    if (props.gameTab === "jackpots") {
      // Filter games based on matching 'jackpot.game' with 'game.id'
      return store.jackpots.filter((jackpot) => jackpot.game === game.id)
        .length;
    }
    if (props.gameTab === "other") {
      // Filter games based on matching 'game.categories' with 'categoriesOther'
      return game.categories.filter((category) =>
        categoriesOther.includes(category)
      ).length;
    }
    // Default case: Filter games based on matching 'game.categories' with 'props.gameTab'
    return game.categories.includes(props.gameTab);
  });
});

const fetchJackpotsFewSeconds = () => {
  // Check if 'props.gameTab' is 'jackpots'
  if (props.gameTab === "jackpots") {
    // Set a timeout to fetch jackpots feed after 3 seconds
    timeoutJackpot = setTimeout(() => {
      console.log("fetch");
      store.fetchJackpotsFeed();
    }, 3000);
  } else {
    // If 'props.gameTab' is not 'jackpots', clear the timeout
    timeoutJackpot = null;
  }
};
const getJackpotByGame = (game) => {
  return store.jackpots.find((jackpot) => jackpot.game === game)?.amount || 0;
};
</script>

<template>
  <div
    class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-2 gap-y-5"
  >
    <div v-for="game in games" :key="game.id">
      <div class="relative game">
        <p
          v-show="props.gameTab === 'jackpots'"
          class="absolute right-0 bg-white m-[9px] p-[7px] text-red-600 font-bold"
        >
          jackpot: {{ getJackpotByGame(game.id) }}
        </p>
        <img
          :src="game.image"
          alt="game-name"
          class="rounded-2xl mx-auto"
          width="370"
        />
        <div
          class="info-play absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center hidden"
        >
          <p class="text-2xl font-bold my-2">{{ game.name }}</p>
          <button class="bg-[#8DC63F] text-white px-6 py-3 rounded">
            Play
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game:hover img {
  opacity: 0.3;
}
.game:hover .info-play {
  display: block;
}
</style>
