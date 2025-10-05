import React from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function PearsonsCorrelation() {
  const formula = String.raw`\rho(x,y) = \frac{\text{cov}(x,y)}{\sigma(x)\sigma(y)}`;

  return (
    <div className="text-white bg-black rounded-lg max-w-[800px]">
      <p className="">
        In statistics, the Pearson correlation coefficient (PCC)[a] is a
        correlation coefficient that measures linear correlation between two
        sets of data. It is the ratio between the covariance of two variables
        and the product of their standard deviations; thus, it is essentially a
        normalized measurement of the covariance, such that the result always
        has a value between −1 and 1.
      </p>
      <h3 className="text-white text-2xl mt-5">
        Pearson's Correlation Coefficient:
      </h3>
      <div className="text-4xl">
        <BlockMath math={formula} />
      </div>
    </div>
  );
}
