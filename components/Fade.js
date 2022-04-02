import { Transition } from "react-transition-group";
import { useState, createRef, useMemo } from "react";
import useOnScreen from "../hooks/useOnScreen";

const duration = 120;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export default function Fade(props) {
  const [inProp, setInProp] = useState(false);
  const ref = createRef();
  const isVisible = useOnScreen(ref);
  const updateTransitionState = (isElVisible) => {
    if (isElVisible) {
      setTimeout(() => {
        setInProp(true);
      }, duration);
    } else {
      setInProp(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => updateTransitionState(isVisible), [isVisible]);

  return (
    <Transition in={inProp} timeout={duration}>
      {(state) => (
        <div
          ref={ref}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {props.children}
        </div>
      )}
    </Transition>
  );
}
