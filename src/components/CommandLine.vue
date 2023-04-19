<script setup lang="ts">
import { Ref, ref } from 'vue';
import commands from '../commands/commands';

  interface Command {
    prompt: string;
    command: string;
    output?: any;
  }

  let command = '';
  let commandHistory: Ref<Command[]> = ref([]);
  let prompt = '> '

  function takeCommand(): void {
    const { command: commandName, args } = parseCommand(command);
    const output = processCommand(commandName, args);
    commandHistory.value.push({command, prompt, output})
    command = '';
  }

  function parseCommand(command: string): { command: string, args: string[] } {
    const commandArray = command.split(' ');
    const mainCommand = commandArray.shift();
    if (!mainCommand) throw new Error('No command provided');
    return { command: mainCommand, args: commandArray}
  }

  function processCommand(command: string, args: string[]): string {
    const commandFunction = commands[command]
    if(commandFunction) return commandFunction(...args);
    return 'command not found';
   }
</script>

<template>
  <div class="command-container">
    <div v-for="{ prompt, command, output} in commandHistory" class="command-line">
      <span class="prompt">{{ prompt }}</span>
      <input type="text" :value="command" disabled>
      <component v-if="typeof output !== 'string'" :is="output" />
      <span v-else>{{ output }}</span>
    </div>
    <div class="command-line">
      <span class="prompt">{{prompt}}</span>
      <input type="text" id="cmd" placeholder="Enter a command..." v-model="command" autofocus  @keyup.enter="takeCommand()">
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

.prompt { 
  color: initial !important;
}
.command-line {
  width: 100%;
  text-align: left;
  color: #8fff27;
  font-size: 12px;
}

.command-container {
  width: 100%;
  height: 500px;
  border-style: solid;
  border-width: 1px;
  border-color: gray;
  border-radius: 2px;
  padding-left: 5px;
  overflow-y: scroll;
}
</style>