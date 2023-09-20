import { defineStore } from "pinia";
import axios from "axios";
export const useGameStore = defineStore("game", {
  state: () => ({
    games: [],
    jackpots: [],
  }),
  actions: {
    async fetchGamesFeed() {
      const { data } = await axios.get(
        "https://stage.whgstage.com/front-end-test/games.php"
      );
      this.games = data;
    },
    async fetchJackpotsFeed() {
      const { data } = await axios.get(
        "https://stage.whgstage.com/front-end-test/jackpots.php"
      );
      this.jackpots = data;
    },
  },
});
