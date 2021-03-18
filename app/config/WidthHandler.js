import { useCallback, useState } from "react";

const useComponentWidth = () => {
  const [width, setWidth] = useState(null);

  const handleWidth = useCallback((event) => {
    const width = event.nativeEvent.layout.width;
    setWidth(Math.floor(width));
  });

  if (width) return [width, handleWidth];
  else return [320, handleWidth]; // *APPROXIMATE CLOSEST VALUE* //
};

export default useComponentWidth;
