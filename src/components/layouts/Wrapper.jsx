import { useMediaQuery } from "react-responsive";

function Wrapper({ children }) {
  const isLarge = useMediaQuery({ minWidth: 1600 });
  const isLaptop = useMediaQuery({ minWidth: 1150, maxWidth: 1600 });
  const isTablet = useMediaQuery({ minWidth: 900, maxWidth: 1150 });
  const isMobile = useMediaQuery({ maxWidth: 900 });

  let wrapWidth;

  if (isLaptop) {
    wrapWidth = 1100;
  } else if (isLarge) {
    wrapWidth = 1280;
  } else if (isTablet) {
    wrapWidth = 800;
  } else if (isMobile) {
    wrapWidth = "100%";
  } else {
    wrapWidth = 1000;
  }

  return (
    <div
      style={{
        width: typeof wrapWidth === "number" ? `${wrapWidth}px` : wrapWidth,
        margin: "0 auto",
        padding: "0 2rem",
      }}
    >
      {children}
    </div>
  );
}

export default Wrapper;
