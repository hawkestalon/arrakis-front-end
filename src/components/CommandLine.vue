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
    <div v-for="cmd in commandHistory" class="command-line">
      <span>{{ cmd.prompt }}</span>
      <input type="text" :value="cmd.command" disabled>
      {{ cmd.output }}
    </div>
    <div class="command-line">
      <span>{{prompt}}</span>
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

.command-line {
  width: 100%;
}

.command-output {
  text-align: left;
  font-size: 12px;
  color: #8fff27;
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