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

const isNewCategory = (game) => {
  return game.categories.includes("new");
};

const fetchJackpotsFewSeconds = () => {
  // Check if 'props.gameTab' is 'jackpots'
  if (props.gameTab === "jackpots") {
    // Set a timeout to fetch jackpots feed after 3 seconds
    timeoutJackpot = setTimeout(() => {
      store.fetchJackpotsFeed();
    }, 3000);
  } else {
    // If 'props.gameTab' is not 'jackpots', clear the timeout
    timeoutJackpot = null;
  }
};
const getJackpotByGame = (game) => {
  const amount = store.jackpots.find(
    (jackpot) => jackpot.game === game
  )?.amount;
  if (amount) return amount ? amount : 0;
};
const formatPounds = (value) => {
  let pounds = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumSignificantDigits: 3,
  });
  return pounds.format(value);
};
</script>

<template>
  <div
    class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-2 gap-y-5"
  >
    <div v-for="game in games" :key="game.id">
      <div class="relative game cursor-pointer">
        <div v-show="isNewCategory(game)" class="ribbon-wrapper-green">
          <div class="ribbon-green">NEWS</div>
        </div>
        <p
          v-show="getJackpotByGame(game.id) > 0"
          class="absolute w-full right-0 bg-[rgba(0,0,0,0.25)] p-[7px] text-white text-xl font-bold rounded-t-2xl text-center"
        >
          {{ formatPounds(getJackpotByGame(game.id)) }}
        </p>
        <img
          :src="game.image"
          alt="game-name"
          class="rounded-2xl w-full mx-auto"
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
.ribbon-wrapper-green {
  width: 85px;
  height: 88px;
  overflow: hidden;
  position: absolute;
  top: -3px;
  right: -3px;
  z-index: 100;
}

.ribbon-green {
  font: bold 15px Sans-Serif;
  color: white;
  text-align: center;
  text-shadow: rgba(255, 255, 255, 0.5) 0px 1px 0px;
  -webkit-transform: rotate(45deg);
  position: relative;
  padding: 7px 0;
  left: -5px;
  top: 15px;
  width: 120px;
  background-color: #8dc63f;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#bfdc7a),
    to(#8ebf45)
  );
  background-image: -webkit-linear-gradient(top, #bfdc7a, #8ebf45);
  background-image: -moz-linear-gradient(top, #bfdc7a, #8ebf45);
  background-image: -ms-linear-gradient(top, #bfdc7a, #8ebf45);
  background-image: -o-linear-gradient(top, #bfdc7a, #8ebf45);
  color: white;
  -webkit-box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
}

.ribbon-green:before,
.ribbon-green:after {
  content: "";
  border-top: 3px solid #6e8900;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  position: absolute;
  bottom: -3px;
}

.ribbon-green:before {
  left: 0;
}
.ribbon-green:after {
  right: 0;
}
</style>
