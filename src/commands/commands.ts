import Echo from './command-components/Echo.vue';

const commands: {[key:string]: any} = {
  echo: (...input: string[]) => Echo
}

export default commands;