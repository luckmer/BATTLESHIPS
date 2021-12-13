import { render } from "@testing-library/react";
import Help from "../help";

describe("Help", () => {
  test("should handle help description", () => {
    const { getByLabelText } = render(<Help />);
    const header = getByLabelText("help");
    expect(header).toBeInTheDocument();
  });

  test("should handle pc", () => {
    const { getByLabelText } = render(<Help />);
    const header = getByLabelText("pc");
    expect(header).toBeInTheDocument();
  });

  test("should handle pc header", () => {
    const { getByLabelText } = render(<Help />);
    const header = getByLabelText("pc_header");
    expect(header).toBeInTheDocument();
  });

  test("should handle pc history", () => {
    const { getByLabelText } = render(<Help />);
    const header = getByLabelText("pc_history");
    expect(header).toBeInTheDocument();
  });

  test("should handle pc attack", () => {
    const { getByLabelText } = render(<Help />);
    const header = getByLabelText("pc_attack");
    expect(header).toBeInTheDocument();
  });

  test("should handle mobile", () => {
    const { getByLabelText } = render(<Help />);
    const header = getByLabelText("mobile");
    expect(header).toBeInTheDocument();
  });

  test("should handle mobile header", () => {
    const { getByLabelText } = render(<Help />);
    const header = getByLabelText("mobile_header");
    expect(header).toBeInTheDocument();
  });

  test("should handle mobile history", () => {
    const { getByLabelText } = render(<Help />);
    const header = getByLabelText("mobile_history");
    expect(header).toBeInTheDocument();
  });

  test("should handle mobile attack", () => {
    const { getByLabelText } = render(<Help />);
    const header = getByLabelText("mobile_attack");
    expect(header).toBeInTheDocument();
  });
});
