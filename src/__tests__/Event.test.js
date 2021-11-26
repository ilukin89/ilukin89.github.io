
import React from "react";
import { shallow } from "enzyme";
import { mockData } from "../mock-data";
import Event from "../Event";

describe("<Event /> component", () => {
  let eventWrapper;
  let event = mockData[0];
  beforeAll(() => {
    eventWrapper = shallow(<Event event={event} />);
  });

  test("the element is collapsed by default", () => {
    eventWrapper.setState({
      collapsed: true,
    });
    expect(eventWrapper.find(".extra-details")).toHaveLength(0);
    expect(eventWrapper.find(".show-details-btn")).toHaveLength(1);
  });


  
  test("Summary is displayed", () => {
    expect(eventWrapper.find(".summary")).toHaveLength(1);
  });

  test("Render date in the collapsed event element", () => {
    expect(eventWrapper.find(".start-date")).toHaveLength(1);
  });

  test("Display location in the collapsed event element", () => {
    expect(eventWrapper.find(".location")).toHaveLength(1);
  });

  test("Button to show details", () => {
    expect(eventWrapper.find(".show-details-btn")).toHaveLength(1);
  });
});