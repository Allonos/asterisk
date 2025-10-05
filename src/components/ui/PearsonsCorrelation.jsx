import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useMediaQuery } from "react-responsive";

export default function PearsonsCorrelation() {
  const isLargeScreen = useMediaQuery({ maxWidth: 1690 });
  const isMobile = useMediaQuery({ maxWidth: 640 });

  let width;
  let fontsize;

  if (isLargeScreen) {
    width = 400;
    fontsize = 26;
  } else if (isMobile) {
    width = 300;
    fontsize = 20;
  } else {
    width = 800;
    fontsize = 36;
  }

  const formula = String.raw`\rho(x,y) = \frac{\text{cov}(x,y)}{\sigma(x)\sigma(y)}`;

  return (
    <div
      className="text-white bg-black rounded-lg"
      style={{ maxWidth: `${width}px` }}
    >
      <p className="">
        In statistics, the Pearson correlation coefficient (PCC) is a
        correlation coefficient that measures linear correlation between two
        sets of data. It is the ratio between the covariance of two variables
        and the product of their standard devihoods; thus, it is essentially a
        normalized measurement of the covariance, such that the result always
        has a value between −1 and 1.
      </p>
      <h3 className="text-white text-2xl mt-5">
        Pearson's Correlation Coefficient:
      </h3>
      <div style={{ fontSize: fontsize }}>
        <BlockMath math={formula} />
      </div>
      <div>
        <p>
          A correlation heatmap is a colored grid that shows how strongly pairs
          of variables move together. Warm colors indicate strong positive
          relationships, cool colors indicate negative relationships or little
          connection, making it easy to spot which pairs are closely linked and
          which are not.
        </p>
      </div>
    </div>
  );
}
