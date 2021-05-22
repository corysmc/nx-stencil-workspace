import readme from './readme.md';

const storyInfo = {
  title: 'My Component',
  component: 'my-component',
  parameters: {
    notes: { markdown: readme },
  },
};

export default storyInfo;

export const basic = (props) => {
  const el = document.createElement('my-component');
  el.first = props['attributes.first'];
  el.last = props['attributes.last'];
  el.middle = props['attributes.middle'];
  el.toggle = props['attributes.toggle'];
  el.onclick = () => console.log('clicked');
  return el;
};

export const double = (props) => {
  const wrapper = document.createElement('div');
  const elOne = document.createElement('my-component');
  const elTwo = document.createElement('my-component');
  elTwo.first = props['attributes.first'];
  elTwo.last = props['attributes.last'];
  elTwo.middle = props['attributes.middle'];
  elTwo.toggle = props['attributes.toggle'];
  elTwo.onclick = () => console.log('clicked');
  wrapper.appendChild(elOne);
  wrapper.appendChild(elTwo);
  return wrapper;
};
