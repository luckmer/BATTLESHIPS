import { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { shipsPropsInterface } from "../Ships/interface";
import { Ship, ShipGrid } from "../../css/game.style";
import { boardsInterface } from "../../pages/interface";
import { SideMenu } from "..";

const WindowEditor = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const Resize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", Resize);
    return () => window.removeEventListener("resize", Resize);
  }, []);

  return [windowSize.width, windowSize.height];
};

interface CheckInterface {
  value: string;
}

const FooterMenu = ({ props }: { props: shipsPropsInterface }) => {
  const [width, height] = WindowEditor();
  const [openSiteMenu, setOpenSiteMenu] = useState(true);
  const [selectedShip, setSelectedShip] = useState("");
  const [checkedCheckboxes, setCheckedCheckboxes] = useState<CheckInterface[]>(
    []
  );

  const handleTouchStart = () => setOpenSiteMenu(() => !openSiteMenu);

  const handleSelectOnlyOneBoat = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const ids = target.id;

    if (ids === selectedShip) {
      setSelectedShip("");
    } else setSelectedShip(ids);
  };

  useEffect(
    () => setOpenSiteMenu(width >= 772 ? false : openSiteMenu),
    [openSiteMenu, width]
  );

  const arrowUp = <AiOutlineArrowUp />;
  const arrowDown = <AiOutlineArrowDown />;

  const { shipData } = props;

  const handleCheckboxChange = (data: { value: string }) => {
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
  };

  const data = { value: "rotate" };

  return (
    <Fragment>
      <Footer
        onClick={handleTouchStart}
        openSiteMenu={openSiteMenu}
        height={height}
      >
        <ArrowCreator>{openSiteMenu ? arrowDown : arrowUp}</ArrowCreator>
      </Footer>
      <FooterSection openSiteMenu={openSiteMenu} height={height}>
        <div>
          <ShipsContainer>
            <HeaderCreator name="Ships" />
            <ShipsDisplayContainer>
              {shipData.map(({ id, size, name }: boardsInterface) => {
                const findShip = name === selectedShip;
                const rotateBlocker = props.state.rotateStatus && findShip;

                const shipBlocks = new Array(size)
                  .fill(1)
                  .map((el: number, i) => {
                    return { name: name, id: el + i };
                  });

                return (
                  <ShipGrid status={rotateBlocker} key={id} size={size}>
                    <Ship
                      size={size}
                      status={rotateBlocker}
                      setupColor={findShip}
                      id={name}
                    >
                      {shipBlocks.map((data: { name: string; id: number }) => (
                        <div
                          key={data.id}
                          onClick={(e) => handleSelectOnlyOneBoat(e)}
                          id={String(data.name)}
                        />
                      ))}
                    </Ship>
                  </ShipGrid>
                );
              })}
            </ShipsDisplayContainer>
          </ShipsContainer>
          <RotationContainer>
            <HeaderCreator name="rotation" />
            <CheckBox>
              <input
                id={data.value}
                value={data.value}
                type="checkbox"
                checked={checkedCheckboxes.some(
                  ({ value }: { value: string }) => value === data.value
                )}
                onChange={() => handleCheckboxChange(data)}
              />
              <label htmlFor={data.value}>{data.value}</label>
            </CheckBox>
          </RotationContainer>
          <div>
            <HeaderCreator name="launching panel" />
            <form></form>
          </div>
        </div>
      </FooterSection>
    </Fragment>
  );
};

const HeaderCreator = ({ name }: { name: string }) => {
  return (
    <ShipsHeaderContainer>
      <ShipsHeader>
        <p>{name}</p>
      </ShipsHeader>
    </ShipsHeaderContainer>
  );
};

export default FooterMenu;

const RotationContainer = styled.div`
  width: 100%;
`;

const CheckBox = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    transition: all 0.5s;
    border-radius: 40px;
    text-align: center;
    margin-bottom: 0.5rem;
    margin: 0px;
    padding: 5px 20px 5px 20px;
    text-align: center;
  }

  input:checked + label {
    background-color: #292d38;
  }

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"] + span {
    display: inline-block;
    position: relative;
    top: -1px;
    width: 12px;
    height: 12px;
    margin: -1px 0px 0 0;
    vertical-align: middle;
    background: white left top no-repeat;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + span {
    background: #d9534f -19px top no-repeat;
  }

  input[type="checkbox"] + span {
    margin-right: 4px;
  }
`;

const ArrowCreator = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;

const Footer = styled.footer<{ openSiteMenu: boolean; height: number }>`
  @media screen and (min-width: 772px) {
    display: none;
  }

  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -ms-transition: all 1s ease;
  -o-transition: all 1s ease;
  transition: all 1s ease;
  transform: translate(0, 0);
  position: absolute;
  border-bottom: 1px solid white;

  bottom: 100%;

  bottom: ${({ openSiteMenu }) => (openSiteMenu ? "100" : `0%`)};
  top: ${({ openSiteMenu, height }) =>
    openSiteMenu ? "0" : `${height - 70}px`};
  width: 100%;
  height: 70px;
  background: #0868cf;
  color: #fff;
  z-index: 3000;
`;

const FooterSection = styled.div<{ openSiteMenu: boolean; height: number }>`
  @media screen and (min-width: 772px) {
    display: none;
  }
  overflow: auto;
  align-items: flex-start;
  flex-direction: column;
  align-items: center;
  width: 100%;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -ms-transition: all 1s ease;
  -o-transition: all 1s ease;
  transition: all 1s ease;
  position: absolute;
  bottom: 0;
  height: ${({ openSiteMenu, height }) =>
    openSiteMenu ? `${height - 70}px` : `0px`};
  background-color: #0868cf;
  color: white;
  z-index: 2999;
`;

const ShipsContainer = styled.div`
  padding: 20px 10px 20px 10px;
  width: 100%;
`;

const ShipsHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ShipsHeader = styled.header`
  font-weight: bold;
  width: 50%;
  margin: auto;
  border-bottom: 1px solid white;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 10px;
  cursor: pointer;
`;

const ShipsDisplayContainer = styled.div`
  transform-origin: top;
  overflow: hidden;
  width: 100%;
  transition: all 0.5s;
`;
