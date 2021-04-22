import { useCallback, useState } from "react";

const useComponentWidth = () => {
  const [height, setHeight] = useState(null);

  const handleHeight = useCallback((event) => {
    const height = event.nativeEvent.layout.height;
    setHeight(Math.floor(height));
  });

  if (height) return [height, handleHeight];
  else return [700, handleHeight]; // *APPROXIMATE CLOSEST VALUE* //
};

export default useComponentWidth;
