<script setup lang="ts">
  let command = ' ';
  let commandHistory: string[] = ['this is a command'];
</script>

<template>
  <div class="command-container">
    <div v-for="cmd in commandHistory" class="command-line">
      <span>></span>
      <input type="text" :value="cmd" disabled>
    </div>
    <div class="command-line">
      <span>></span>
      <input type="text" id="cmd" placeholder="Enter a command..." v-model="command" autofocus>
    </div>
  </div>
</template>

<style scoped>
input {
  border: none;
  background-color: unset;
  width: 97%;
}

input:focus-visible {
  outline:none;
}

.command-line {
  width: 100%;
}

.command-container {
  width: 100%;
  height: 500px;
  border-style: solid;
  border-width: 1px;
  border-color: gray;
  border-radius: 2px;
  padding-left: 5px;
}
</style>