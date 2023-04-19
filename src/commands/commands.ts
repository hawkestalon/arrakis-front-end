import buildEchoNode from './command-components/echo';

const commands: {[key:string]: any} = {
  echo: (...input: string[]) => {
    const message = input.join(' ');
    if (!message) throw new Error('Please provide an argument for echo');
    return buildEchoNode(message);
  }
}

export default commands;