import { Fragment } from "react";
import { shipInterface } from "../../service/ships/interface";
import { InitialStateType } from "../../store/interface";
import { ShipGrid, Ship } from "../../css/game.style";
import { boardsInterface } from "../../pages/interface";

interface shipsPropsInterface {
  shipData: shipInterface[];
  state: InitialStateType;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragStartShip: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDropShip: (e: React.DragEvent<HTMLDivElement>) => void;
  handleRotateShip: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseOver: (el: number) => void;
}

const Ships = ({ props }: { props: shipsPropsInterface }) => {
  const { shipData } = props;

  return (
    <Fragment>
      {shipData.map(({ id, size, name }: boardsInterface) => {
        const findShip = props.state.rotateShip.some(
          (el: string) => el === name
        );
        const rotateBlocker = props.state.rotateStatus && findShip;

        const shipBlocks = new Array(size).fill(1).map((el: number, i) => {
          return { name: name, id: el + i };
        });

        return (
          <ShipGrid status={rotateBlocker} key={id}>
            <Ship
              draggable
              onDragOver={(e) => props.handleDragOver(e)}
              onDragStart={(e) => props.handleDragStartShip(e)}
              onDrop={(e) => props.handleDropShip(e)}
              size={size}
              status={rotateBlocker}
              setupColor={findShip}
              id={name}
            >
              {shipBlocks.map((data: { name: string; id: number }) => (
                <div
                  key={data.id}
                  onClick={(e) => props.handleRotateShip(e)}
                  id={String(data.name)}
                  onMouseOver={() => props.handleMouseOver(data.id)}
                />
              ))}
            </Ship>
          </ShipGrid>
        );
      })}
    </Fragment>
  );
};

export default Ships;
