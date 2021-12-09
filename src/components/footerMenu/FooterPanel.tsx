import { Footer, ArrowCreator } from "../css/FooterMenu.style";

const FooterPanel = (
  handleTouchStart: () => void,
  openSiteMenu: boolean,
  height: number,
  arrowUp: JSX.Element
) => {
  const status: string = openSiteMenu.toString();

  return (
    <Footer
      onClick={handleTouchStart}
      openSiteMenu={openSiteMenu}
      height={height}
    >
      <ArrowCreator rotate={status}>{arrowUp}</ArrowCreator>
    </Footer>
  );
};

export default FooterPanel;
