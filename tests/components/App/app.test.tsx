import * as React from 'react';
import { configure, mount } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { App } from '../../../src/components/App/app';

configure({ adapter: new Adapter() });

describe('<App/>', () => {
    it('Should render App component w/o errors', () => {
        const wrapper = mount(<App />);
        expect(wrapper.find('h1').text()).toBe('Hello world!');
    });
});