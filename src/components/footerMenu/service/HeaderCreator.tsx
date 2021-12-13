import { memo } from "react";
import { ShipsHeaderContainer, ShipsHeader } from "../../css/FooterMenu.style";

export const HeaderCreator = memo(({ name }: { name: string }) => {
  return (
    <ShipsHeaderContainer>
      <ShipsHeader role="dialog">
        <p>{name}</p>
      </ShipsHeader>
    </ShipsHeaderContainer>
  );
});
