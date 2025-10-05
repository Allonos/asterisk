import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { Scroll, useScroll } from "@react-three/drei";
import Section from "./Section";
import Wrapper from "../layouts/wrapper";

import OverlayStyles from "./styles/Overlay.module.css";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function Overlay({ enabled }) {
  const scroll = useScroll();
  const isSmall = useMediaQuery({ maxWidth: 560 });
  const navigate = useNavigate();

  const [opacityFirstSection, setOpacityFirstSection] = useState(1);
  const [opacitySecondSection, setOpacitySecondSection] = useState(1);
  const [opacityThirdSection, setOpacityThirdSection] = useState(1);
  const [opacityFourthSection, setOpacityFourthSection] = useState(1);
  const [opacityFifthSection, setOpacityFifthSection] = useState(1);

  useFrame(() => {
    if (!enabled) return;

    setOpacityFirstSection(1 - scroll.range(0, 1 / 5));

    setOpacitySecondSection(scroll.curve(0.5 / 5, 1.5 / 5));

    const thirdStart = 2 / 5;
    const thirdEnd = 3.4 / 5;
    const thirdRange = thirdEnd - thirdStart;
    setOpacityThirdSection(scroll.curve(thirdStart, thirdRange));

    const fourthStart = 3 / 5;
    const fourthEnd = 4.8 / 5;
    const fourthRange = fourthEnd - fourthStart;
    setOpacityFourthSection(scroll.curve(fourthStart, fourthRange));

    setOpacityFifthSection(scroll.range(3.8 / 5, 1 / 5));
  });

  return (
    <Scroll html>
      <Wrapper>
        <div style={{ width: "100vw" }}>
          <Section
            opacity={opacityFirstSection}
            isLastSection={false}
            isSmall={isSmall}
          >
            <h1 className={OverlayStyles.cardTitle}>Welcome to ASTERISK</h1>
            <p className={OverlayStyles.pText}>
              Explore the cosmos with our interactive asteroid visualization.
              Scroll down to discover more about space exploration.
            </p>
            <p className={OverlayStyles.arrow}>↓</p>
          </Section>

          <Section
            right={!isSmall}
            opacity={opacitySecondSection}
            isLastSection={false}
            isSmall={isSmall}
          >
            <h1 className={OverlayStyles.cardTitle}>Section Two</h1>
            <p className={OverlayStyles.pText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <p className={OverlayStyles.arrow}>↓</p>
          </Section>

          <Section
            opacity={opacityThirdSection}
            isLastSection={false}
            isSmall={isSmall}
          >
            <h1 className={OverlayStyles.cardTitle}>Section Three</h1>
            <p className={OverlayStyles.pText}>
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages.
            </p>
            <p className={OverlayStyles.arrow}>↓</p>
          </Section>

          <Section
            right={!isSmall}
            opacity={opacityFourthSection}
            isLastSection={false}
            isSmall={isSmall}
          >
            <h1 className={OverlayStyles.cardTitle}>Section Four</h1>
            <p className={OverlayStyles.pText}>
              More recently with desktop publishing software like Aldus
              PageMaker including versions of Lorem Ipsum. The asteroid
              continues its journey through space as you scroll.
            </p>
            <p className={OverlayStyles.arrow}>↓</p>
          </Section>

          <Section
            right={!isSmall}
            opacity={opacityFifthSection}
            isLastSection={true}
            isSmall={isSmall}
          >
            <h1 className={OverlayStyles.cardTitle}>Final Section</h1>
            <p className={OverlayStyles.pText}>
              Thank you for exploring! The asteroid continues its journey
              through space, just like your journey through this content. Watch
              as it moves across the screen based on your scroll position.
              <span onClick={() => navigate("/about")}>
                Want more? click this text
              </span>
            </p>
          </Section>
        </div>
      </Wrapper>
    </Scroll>
  );
}
