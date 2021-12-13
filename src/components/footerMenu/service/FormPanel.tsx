import { CheckInterface, TextInterface } from "../interface/TextInterface";
import {
  FormDiv,
  Form,
  BoxSpacer,
  BoxDiv,
  InputButton,
  InputSpacer,
  Input,
  FormButton
} from "../../css/FooterMenu.style";

interface FormInterface {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  receivedData: { value: string }[];
  checkedCheckboxes: CheckInterface[];
  handleCheckboxChange: (data: { value: string }) => void;
  text: TextInterface;
  handleChange: (e: React.ChangeEvent<HTMLDivElement>) => void;
}

export const FormPanel = ({ props }: { props: FormInterface }) => {
  const {
    handleSubmit,
    receivedData,
    checkedCheckboxes,
    handleCheckboxChange,
    text,
    handleChange
  } = props;

  return (
    <FormDiv>
      <Form onSubmit={handleSubmit}>
        {receivedData?.map((data, index) => {
          const Sort = checkedCheckboxes.filter(
            ({ value }: { value: string }) => value === data.value
          );

          const animateMove = Sort.some(
            ({ value }: { value: string }) => value === data.value
          );

          return (
            <BoxSpacer key={`cb-${index}`} move={animateMove}>
              <BoxDiv>
                <InputButton
                  type="button"
                  value={`${data.value} location`}
                  onClick={() => handleCheckboxChange(data)}
                />
              </BoxDiv>
              {Sort.map(({ value }: { value: string }) => (
                <InputSpacer key={value}>
                  <Input
                    name={value}
                    value={text[value]}
                    placeholder={
                      data.value === "horizontal"
                        ? "select location from a to j"
                        : "select location from 1 to 10"
                    }
                    onChange={handleChange}
                  />
                </InputSpacer>
              ))}
            </BoxSpacer>
          );
        })}
        <FormButton type="submit" value="submit" aria-label="cost-submit" />
      </Form>
    </FormDiv>
  );
};
