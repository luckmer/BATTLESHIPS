import { Fragment, memo } from "react";
import { mapInterface } from "../../service/boardCreator/interface";
import { Div, Grid, RedDot, DivBoat } from "../../css/game.style";
import { InitialStateType } from "../../store/interface";
import { BoatEndStartGenerator } from "./ShipDeconstructor";
import { isEqual } from "lodash";

interface PlayerBoardProps {
  boardData: mapInterface[];
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDropPlayer: (e: React.DragEvent<HTMLDivElement>) => void;
  state: InitialStateType;
}

const PlayerBoard = (props: PlayerBoardProps) => {
  const { handleDragOver, boardData, handleDropPlayer, state } = props;
  const [idsStart, idsEnd] = BoatEndStartGenerator(state);

  return (
    <Div aria-label="main_container">
      {boardData.map(
        (
          {
            id,
            used,
            attack,
            name,
            rotated,
            placer,
            location
          }: {
            placer: string;
            location: number;
            attack: boolean;
            name?: string;
            id: number;
            used: string | boolean;
            rotated?: boolean;
          },
          i
        ) => {
          const findStart = idsStart.includes(id);
          const findEnd = idsEnd.includes(id);
          const shipDetected = name !== "enemy" && attack;

          return (
            <Grid
              placer={placer}
              location={location}
              rotated={rotated}
              id={String(i + 1)}
              key={id}
              findStart={findStart}
              findEnd={findEnd}
              onDragOver={(e: React.DragEvent<HTMLDivElement>) =>
                handleDragOver(e)
              }
              onDrop={(e: React.DragEvent<HTMLDivElement>) =>
                handleDropPlayer(e)
              }
              status="player"
              boat={used}
              attack={attack}
            >
              <Fragment>
                <DivBoat
                  boat={used}
                  findStart={findStart}
                  findEnd={findEnd}
                  rotated={rotated}
                >
                  <RedDot
                    attack={attack}
                    shipDetected={shipDetected}
                    color="#ECB365"
                  />
                </DivBoat>
                {!shipDetected && <RedDot attack={attack} />}
              </Fragment>
            </Grid>
          );
        }
      )}
    </Div>
  );
};

export default memo(PlayerBoard, isEqual);
