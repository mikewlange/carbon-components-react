import React from 'react';
import Modal from '../Modal';
import ModalWrapper from '../../containers/ModalWrapper';
import { shallow, mount } from 'enzyme';

describe('Modal', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<Modal className="extra-class" />);

    it('has the expected classes', () => {
      expect(wrapper.hasClass('bx--modal')).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('should not be a passive modal by default', () => {
      expect(wrapper.hasClass('bx--modal-tall')).toEqual(true);
    });

    it('should be a passive modal when passiveModal is passed', () => {
      wrapper.setProps({ passiveModal: true });
      expect(wrapper.hasClass('bx--modal-tall')).toEqual(false);
    });

    it('should set id if one is passed via props', () => {
      const modal = shallow(<Modal id="modal-1" />);
      expect(modal.props().id).toEqual('modal-1');
    });
  });

  describe('Adds props as expected to the right children', () => {
    it('should set label if one is passed via props', () => {
      const wrapper = shallow(<Modal modalLabel="modal-1" />);
      const label = wrapper.find('.bx--modal-content__label');
      expect(label.props().children).toEqual('modal-1');
    });

    it('should set modal heading if one is passed via props', () => {
      const wrapper = shallow(<Modal modalHeading="modal-1" />);
      const heading = wrapper.find('.bx--modal-content__heading');
      expect(heading.props().children).toEqual('modal-1');
    });

    it('should set button text if one is passed via props', () => {
      const wrapper = shallow(<Modal primaryButtonText="Submit" secondaryButtonText="Cancel" />);
      const primaryButton = wrapper.find('.bx--modal__buttons-container .bx--btn');
      const secondaryButton = wrapper.find('.bx--modal__buttons-container .bx--btn--secondary');
      expect(primaryButton.props().children).toEqual('Submit');
      expect(secondaryButton.props().children).toEqual('Cancel');
    });
  });

  describe('events', () => {
    it('should set expected class when state is open', () => {
      const wrapper = mount(<ModalWrapper />);
      const modal = wrapper.childAt(1);
      const modalContainer = modal.find('.bx--modal');
      const openClass = 'is-visible';
      expect(modalContainer.hasClass(openClass)).not.toEqual(true);
      wrapper.setState({ open: true });
      expect(modalContainer.hasClass(openClass)).toEqual(true);
    });

    it('should set state to open when trigger button is clicked', () => {
      const wrapper = mount(<ModalWrapper />);
      const triggerBtn = wrapper.childAt(0);
      expect(wrapper.state().open).not.toEqual(true);
      triggerBtn.simulate('click');
      expect(wrapper.state().open).toEqual(true);
    });

    it('should set open state to false when close button is clicked', () => {
      const wrapper = mount(<ModalWrapper />);
      const modal = wrapper.childAt(1);
      const closeBtn = modal.find('.bx--modal__close');
      wrapper.setState({ open: true });
      expect(wrapper.state().open).toEqual(true);
      closeBtn.simulate('click');
      expect(wrapper.state().open).not.toEqual(true);
    });

    it('should stay open when "inner modal" is clicked', () => {
      const wrapper = mount(<ModalWrapper />);
      const modal = wrapper.childAt(1);
      const div = modal.find('.bx--modal-inner');
      wrapper.setState({ open: true });
      div.simulate('click');
      expect(wrapper.state().open).toEqual(true);
    });

    it('should close when "outer modal" is clicked...not "inner modal"', () => {
      const wrapper = mount(<ModalWrapper />);
      const modal = wrapper.childAt(1);
      const div = modal.find('.bx--modal');
      wrapper.setState({ open: true });
      div.simulate('click');
      expect(wrapper.state().open).toEqual(false);
    });
  });
});