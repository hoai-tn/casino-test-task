import { defineStore } from "pinia";
import { getGamesFeed, getJackpots } from "~/apis/game";
export const useGameStore = defineStore("game", {
  state: () => ({
    games: [],
    jackpots: [],
  }),
  actions: {
    async fetchGamesFeed() {
      try {
        const games = await getGamesFeed();
        this.games = games;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchJackpotsFeed() {
      try {
        const jackpots = await getJackpots();
        this.jackpots = jackpots;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
