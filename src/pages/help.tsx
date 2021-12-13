import {
  Section,
  Header,
  HeaderPanel,
  Small,
  H1,
  PCContainer,
  PcDescriptionPanel,
  P
} from "../css/help.style";

const Help = () => {
  return (
    <Section>
      <Header>
        <HeaderPanel>
          <Small aria-label="help"> Need Help? </Small>
        </HeaderPanel>
        <Small> 24/7 </Small>
        <H1>Help Panel</H1>
      </Header>
      <PCContainer>
        <div>
          <H1 aria-label="pc">Pc Controll</H1>
        </div>
        <PcDescriptionPanel>
          <Small aria-label="pc_header">player ships</Small>
          <P>
            The boat control panel is located in the bottom left corner, after
            opening it drag the ship to the player's area, then drop the ship by
            releasing the mouse button.
          </P>
          <Small aria-label="pc_history">player history</Small>
          <P>
            the move history is located in the bottom left corner , when opened
            you can select the previous move , at the bottom of the menu there
            will be a button to stop updating the selected move history
          </P>
          <Small aria-label="pc_attack">player Attack</Small>
          <P>to make an attack on an enemy, click on the enemy's board</P>
        </PcDescriptionPanel>
      </PCContainer>

      <PCContainer>
        <div>
          <H1 aria-label="mobile">Mobile Controll</H1>
        </div>
        <PcDescriptionPanel>
          <Small aria-label="mobile_header">player ships</Small>
          <P>
            the ships control panel is located at the bottom of the screen ,
            after clicking it a panel will open with empty fields for the user
            to fill in , after receiving the correct data the user will receive
            feedback
          </P>
          <Small aria-label="mobile_history">player history</Small>
          <P>
            move history is located at the bottom center of the screen , when
            opened you can select the previous move, at the bottom of the menu
            there there will be a button to stop the update of the selected move
            history
          </P>
          <Small aria-label="mobile_attack">player Attack</Small>
          <P>
            to attack the opponent, open the panel located in the bottom right
            corner and fill in the fields accordingly , or make a click on the
            opponent's board
          </P>
        </PcDescriptionPanel>
      </PCContainer>
    </Section>
  );
};

export default Help;
