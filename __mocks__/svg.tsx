import React, { SVGProps } from "react";

/** Required due to the svgr webpack plugin or else tests will throw errors for components that import svgs */

const SvgrMock = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => <svg ref={ref} {...props} />
);

export const ReactComponent = SvgrMock;
export default SvgrMock;
