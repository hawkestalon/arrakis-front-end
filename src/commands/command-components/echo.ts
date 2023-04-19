import { h } from 'vue';

const buildEchoNode = (message: string) => {
  return h('span', { innerHTML: message });
}

export default buildEchoNode;
