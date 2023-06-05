import { html } from 'lit';
import '../src/red-green-light.js';

export default {
  title: 'RedGreenLight',
  component: 'red-green-light',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <red-green-light
      style="--red-green-light-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </red-green-light>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
