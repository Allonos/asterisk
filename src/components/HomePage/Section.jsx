import { useMediaQuery } from "react-responsive";
import SectionStyles from "./styles/Section.module.css";

const Section = ({ children, right, opacity, isLastSection, isSmall }) => {
  const isLargeScreen = useMediaQuery({
    minWidth: 2000,
    maxWidth: 2560,
  });
  const isMobile = useMediaQuery({ maxWidth: 900 });

  let width = isLargeScreen ? 58 : 48;

  if (!isMobile && isLargeScreen) {
    width = 58;
  } else if (!isMobile && !isLargeScreen) {
    width = 48;
  } else {
    width = 70;
  }

  if (isSmall) {
    width = 90;
  }

  let cardPosition;

  if (isMobile || isSmall) {
    cardPosition = "center";
  } else {
    cardPosition = right ? "flex-end" : "flex-start";
  }

  return (
    <section
      className={SectionStyles.sectionContainer}
      style={{
        alignItems: cardPosition,
        opacity: opacity,
      }}
    >
      <div
        className={SectionStyles.card}
        style={{
          width: isSmall ? `${width}%` : right ? `${width}%` : `${width + 1}%`,
          marginRight: isSmall ? "60px" : "0",
        }}
      >
        <div className={SectionStyles.cardContentParent}>
          <div
            className={SectionStyles.cardContent}
            style={{
              ...(isLastSection && !isMobile && { marginBottom: "350px" }),
              ...(isLastSection && isMobile && { marginBottom: "650px" }),
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
