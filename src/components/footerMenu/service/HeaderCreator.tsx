import { ShipsHeaderContainer, ShipsHeader } from "../../css/FooterMenu.style";

export const HeaderCreator = ({ name }: { name: string }) => {
  return (
    <ShipsHeaderContainer>
      <ShipsHeader>
        <p>{name}</p>
      </ShipsHeader>
    </ShipsHeaderContainer>
  );
};
