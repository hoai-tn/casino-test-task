<script setup>
import { gameTabs } from "~/shares/game";
const emit = defineEmits(["on-toggle-tab"]);

const openTab = ref("top");
const toggleTabs = function (tabNumber) {
  openTab.value = tabNumber;
  emit("on-toggle-tab", tabNumber);
};
</script>

<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <ul class="flex mb-0 list-none flex-wrap pb-4 flex-row">
        <li
          class="-mb-px last:mr-0 flex-auto text-center cursor-pointer"
          v-for="(gameTab, key) in gameTabs"
          :key="key"
        >
          <a
            class="text-xl py-5 px-2 block leading-normal"
            v-on:click="toggleTabs(gameTab.key)"
            v-bind:class="{
              'text-white bg-[#373737]': openTab !== gameTab.key,
              'text-white bg-[#8DC63F]': openTab === gameTab.key,
            }"
          >
            {{ gameTab.label }}
          </a>
        </li>
      </ul>
      <div class="relative flex flex-col">
        <div class="px-4 py-5 flex-auto">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
