// import React from 'react';
import * as React from 'react'
import financialSummary from './financial_summary.json';
import Payment from './Payment';
import { getAccountSummary } from './converter/convertCatrgoriesClientToService';
import { expect } from 'chai';
import { mount, render, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


const paymetItems = getAccountSummary(financialSummary.categorySummaries).map((item)=> item.title);

describe('Payment text Component', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = { paymentItem: paymetItems, find: "Expense" };
    wrapper = mount(<Payment default={props} />);
  });

  it('Number of li elements in payment', () => {
    expect(wrapper.find('li')).to.have.lengthOf(5);
  })

  it('correctly sets values to li elements', () => {
    expect(wrapper.find('li').at(3).text()).to.eql(("Report number"))
  })

  it('shows total table row elements passed', () => {
    expect(wrapper.find('tr')).to.have.length(9);
  })

})

describe('Payment search Component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = { paymentItem: paymetItems, find: "Order" };
    wrapper = mount(<Payment default={props} />);
  });

  it('check if input is set or not', () => {
    wrapper.find('input[type="search"]').simulate('change', { target: { value: "hello" } })
    expect(wrapper.state().input).to.equal("hello");
  })

  it('getting element using className', () => {
    wrapper.find('.search').simulate('change', { target: { value: "hello" } })
    expect(wrapper.state().input).to.equal("hello");
  })

  it('mock a function findPerson() inside searchItem and see the result', () => {
    expect(wrapper.instance().findPerson()).to.equal('ORDER');
  })
})


describe('Account summary Component', () => {

  it('account summary is defined ', () => {
    expect(getAccountSummary).to.be.not.undefined;
  })
  it('account summary fetch correct array size ', () => {
    expect(getAccountSummary(financialSummary.categorySummaries)).to.have.lengthOf(8);
  })
  it('first output should show correct value', () => {
    expect(getAccountSummary(financialSummary.categorySummaries)[0].title).to.equal("ORDER");
  })

})