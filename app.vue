<script setup>
import { useGameStore } from "/store/games";
const gameTab = ref("top");
const store = useGameStore();
await store.fetchGamesFeed();
await store.fetchJackpotsFeed();
const handleToggleTabs = (tab) => {
  gameTab.value = tab;
};
</script>
<template>
  <GamesTabs @on-toggle-tab="handleToggleTabs">
    <div class="container mx-auto p-4 xl">
      <GamesFeed :gameTab="gameTab" />
    </div>
  </GamesTabs>
</template>
