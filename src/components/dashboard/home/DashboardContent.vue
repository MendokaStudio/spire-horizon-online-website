<script setup>
import StatisticCard from "./StatisticCard.vue";
</script>

<template>
  <div class="p-4 sm:ml-64">
    <!-- Content here -->
    <div
      class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
    >
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatisticCard
          statName="Server Gold"
          :statValue="1900"
          statImage=""
          class="max-w-16"
        />
        <StatisticCard
          statName="Server Gold"
          :statValue="1900"
          statImage=""
          class="max-w-16"
        />
        <StatisticCard
          statName="Server Gold"
          :statValue="1900"
          statImage=""
          class="max-w-16"
        />
        <StatisticCard
          statName="Server Gold"
          :statValue="1900"
          statImage=""
          class="max-w-16"
        />
        <StatisticCard
          statName="Server Gold"
          :statValue="1900"
          statImage=""
          class="max-w-16"
        />
        <StatisticCard
          statName="Server Gold"
          :statValue="1900"
          statImage=""
          class="max-w-16"
        />
      </div>
    </div>
  </div>
</template>
