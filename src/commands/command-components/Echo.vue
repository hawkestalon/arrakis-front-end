<script setup lang='ts'>
  const props = defineProps({
    output: { type: String, required: true }
  });
</script>

<template>
  <div class="command-output">{{ props.output }} hello world</div>
</template>

<style scoped>
.command-output {
  text-align: left;
  font-size: 12px;
  color: #8fff27;
}
</style>