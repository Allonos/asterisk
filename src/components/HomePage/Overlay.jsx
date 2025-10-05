import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { Scroll, useScroll } from "@react-three/drei";
import Section from "./Section";
import Wrapper from "../layouts/wrapper";

import OverlayStyles from "./styles/Overlay.module.css";
import { useMediaQuery } from "react-responsive";

export default function Overlay({ enabled }) {
  const scroll = useScroll();
  const isSmall = useMediaQuery({ maxWidth: 560 });

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
            <h1 className={OverlayStyles.cardTitle}>
              Research Purposes and Public Access
            </h1>
            <p className={OverlayStyles.pText}>
              Open-source data on meteors—covering both upcoming trajectories
              and present coordinates—provides valuable resources for a wide
              range of specialists. Such transparency not only speeds up
              research in various fields of science but also promotes public
              engagement. By making this data freely available, people of all
              ages and backgrounds are encouraged to participate in scientific
              literacy, citizen science, and global awareness of planetary
              processes.
            </p>
            <p className={OverlayStyles.arrow}>↓</p>
          </Section>

          <Section
            right={!isSmall}
            opacity={opacitySecondSection}
            isLastSection={false}
            isSmall={isSmall}
          >
            <h1 className={OverlayStyles.cardTitle}>
              Avoiding Direct Dangers of Meteors Hitting Earth
            </h1>
            <p className={OverlayStyles.pText}>
              Comprehensive trajectory studies allow potential threats to be
              identified days or even weeks in advance, enabling preparation
              and, in extreme cases, evacuation. A dedicated database can
              classify objects by their risk level and generate impact maps,
              helping authorities plan responses to possible danger. For larger
              objects, which can trigger seismic activity or tsunamis, such
              systems could operate similarly to modern weather forecasts,
              delivering real-time updates and impact predictions that safeguard
              lives and infrastructure.
            </p>
            <p className={OverlayStyles.arrow}>↓</p>
          </Section>

          <Section
            opacity={opacityThirdSection}
            isLastSection={false}
            isSmall={isSmall}
          >
            <h1 className={OverlayStyles.cardTitle}>
              Protecting Satellites, Communication, and Navigation Systems
            </h1>
            <p className={OverlayStyles.pText}>
              Meteoroids pose a serious risk to satellites, which are critical
              for banking, navigation, emergency response, and global internet
              connectivity. A reliable forecasting system would allow operators
              to adjust satellite orbits in advance, reducing the likelihood of
              catastrophic damage. Beyond protecting current infrastructure,
              these insights also strengthen support for space missions,
              allowing spacecraft to plan safe routes and shielding strategies
              based on predicted meteoroid activity.
            </p>
            <p className={OverlayStyles.arrow}>↓</p>
          </Section>

          <Section
            right={!isSmall}
            opacity={opacityFourthSection}
            isLastSection={false}
            isSmall={isSmall}
          >
            <h1 className={OverlayStyles.cardTitle}>
              Predicting Small Meteor Falls for Resource Potential
            </h1>
            <p className={OverlayStyles.pText}>
              often contain rare and technologically vital elements such as
              nickel, cobalt, and platinum-group metals. Tracking and predicting
              small meteor falls not only facilitates efficient recovery of
              fresh material but also opens pathways for economic benefit and
              innovation in resource application. Moreover, freshly fallen
              meteorites are crucial for scientific study, offering unaltered
              samples from the early solar system. Cataloging such events
              contributes essential knowledge for the emerging field of asteroid
              mining and the sustainable use of extraterrestrial resources.
            </p>
            <p className={OverlayStyles.arrow}>↓</p>
          </Section>

          <Section
            right={!isSmall}
            opacity={opacityFifthSection}
            isLastSection={true}
            isSmall={isSmall}
          >
            <h1 className={OverlayStyles.cardTitle}>
              Contributions to Earth’s Ecology and Climate
            </h1>
            <p className={OverlayStyles.pText}>
              The impact of meteorites extends far beyond immediate risks. Large
              collisions can inject dust and aerosols into the atmosphere,
              adjusting altering climate patterns for years by cooling global
              temperatures and blocking sunlight. Even smaller, routine
              meteoroid infall contributes cosmic dust that can influence cloud
              formation, atmospheric chemistry, and long-term ecological
              processes. Studying these contributions increases our
              understanding of Earth’s climate flexibility and provides key
              insights into how habitable environments might develop on other
              planets.
            </p>
          </Section>
        </div>
      </Wrapper>
    </Scroll>
  );
}
