import React from 'react';
import { shallow } from 'enzyme';
import { Summary } from '../../components/Summary';

// TEST: Rendering (one expense)
test('should correctly render Summary with one expense', () => {
	const wrapper = shallow(<Summary count={1} total={235} />);
	expect(wrapper).toMatchSnapshot();
});

// TEST: Rendering (multiple expenses)
test('should correctly render Summary with multiple expenses', () => {
	const wrapper = shallow(<Summary count={23} total={23512341234} />);
	expect(wrapper).toMatchSnapshot();
});