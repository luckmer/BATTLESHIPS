import { FormPanel } from "../FormPanel";

import { render, cleanup, fireEvent } from "@testing-library/react";
import { CheckInterface, TextInterface } from "../../interface/TextInterface";

afterEach(cleanup);

const Helper = () => {
  const handleSubmit = () => {};
  const receivedData = [{ value: "vertical" }, { value: "horizontal" }];
  const checkedCheckboxes: CheckInterface[] = [
    { value: "horizontal" },
    { value: "vertical" }
  ];
  const text: TextInterface = {
    vertical: "1",
    horizontal: "a"
  };

  const handleCheckboxChange = () => {};
  const handleChange = () => {};

  const PROPS = {
    handleSubmit,
    receivedData,
    checkedCheckboxes,
    handleCheckboxChange,
    text,
    handleChange
  };

  const data = render(<FormPanel props={PROPS} />);

  const inputA = data.getByPlaceholderText(
    "select location from a to j"
  ) as HTMLInputElement;

  const inputB = data.getByPlaceholderText(
    "select location from 1 to 10"
  ) as HTMLInputElement;

  return { PROPS, data, inputA, inputB };
};

describe("FooterAttack", () => {
  test("should render form panel", () => {
    const { PROPS } = Helper();

    render(<FormPanel props={PROPS} />);
  });

  test("expect correct data for horizontal movement", () => {
    const { inputA } = Helper();

    fireEvent.change(inputA, { target: { value: "a" } });
    expect(inputA.value).toBe("a");
  });

  test("expect correct data for vertical movement", () => {
    const { inputB } = Helper();

    fireEvent.change(inputB, { target: { value: "1" } });
    expect(inputB.value).toBe("1");
  });

  test("expect submit button", () => {
    const { data } = Helper();

    const { getByLabelText } = data;

    const submit = getByLabelText("cost-submit");

    expect(submit).toBeInTheDocument();
  });
});
