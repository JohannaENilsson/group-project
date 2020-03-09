import React from "react";
import { shallow } from "enzyme";

import Sidebar from '../components/Sidebar'


it('should render four li element', () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.find('li').length).toBe(4);
});

