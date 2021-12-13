import { Fragment, useCallback, useState } from "react";

import WindowEditor from "../../hooks/WindowEditor.hook";
import FooterPanel from "./FooterPanel";

import { CheckInterface, TextInterface } from "./interface/TextInterface";
import { shipsPropsInterface } from "../Ships/interface";
import { HeaderCreator } from "./service/HeaderCreator";
import { FooterSection } from "../css/FooterMenu.style";
import { AiOutlineArrowUp } from "react-icons/ai";
import { FormPanel } from "./service/FormPanel";
import { Types } from "../../store/types";

function FooterAttack({
  props,
  handleShipAttack
}: {
  handleShipAttack: (id: number) => void;
  props: shipsPropsInterface;
}) {
  const [, height] = WindowEditor();
  const [openSiteMenu, setOpenSiteMenu] = useState(false);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState<CheckInterface[]>(
    []
  );
  const [text, setText] = useState<TextInterface>({
    vertical: "",
    horizontal: ""
  });

  const { boardData, dispatch } = props;

  const handleTouchStart = useCallback(
    () => setOpenSiteMenu(() => !openSiteMenu),
    [openSiteMenu]
  );

  const arrowUp = <AiOutlineArrowUp />;

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const horizontal = text.horizontal;
      const vertical = Number(text.vertical);
      const correctAlphabet = new Array(10)
        .fill(1)
        .map((_, i) => String.fromCharCode(65 + i).toLocaleLowerCase());

      const correctNumbers = new Array(10).fill(1).map((_, i) => i + 1);
      if (
        horizontal &&
        correctAlphabet.includes(horizontal) &&
        vertical &&
        correctNumbers.includes(vertical)
      ) {
        const findCorrectLocation = boardData.find(
          (el) =>
            el.location === vertical &&
            el.placer.toString() === horizontal.toString()
        );
        if (!findCorrectLocation) return;

        handleShipAttack(findCorrectLocation.id);
      } else {
        dispatch({
          type: Types.Correct_status,
          payload: { status: true, response: "could not find the location" }
        });
      }
    },
    [boardData, dispatch, handleShipAttack, text]
  );

  const handleChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    setText({ ...text, [target.name]: target.value });
  };

  const handleCheckboxChange = useCallback(
    (data: { value: string }) => {
      const isChecked = checkedCheckboxes.some(
        ({ value }: { value: string }) => value === data.value
      );
      if (isChecked) {
        setCheckedCheckboxes(
          checkedCheckboxes.filter(
            ({ value }: { value: string }) => value !== data.value
          )
        );
      } else setCheckedCheckboxes((prev) => prev.concat(data));
    },
    [checkedCheckboxes]
  );

  const receivedData = [{ value: "vertical" }, { value: "horizontal" }];

  const PROPS = {
    handleSubmit,
    receivedData,
    checkedCheckboxes,
    handleCheckboxChange,
    text,
    handleChange
  };

  return (
    <Fragment>
      {FooterPanel(handleTouchStart, openSiteMenu, height, arrowUp)}
      <FooterSection openSiteMenu={openSiteMenu} height={height}>
        <HeaderCreator name="attack panel" />
        <FormPanel props={PROPS} />
      </FooterSection>
    </Fragment>
  );
}

export default FooterAttack;
