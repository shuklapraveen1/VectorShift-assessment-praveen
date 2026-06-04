// ResetAnimation component that displays an animation when the workflow is being reset. It uses the useStore hook to access the isResetting state from the global store, and conditionally renders the animation elements (overlay, paper ball, and trash can) when isResetting is true.
import { useStore } from "./store";

export const ResetAnimation = () => {
  const isResetting = useStore(
    (state) => state.isResetting
  );

  if (!isResetting) return null;

  return (
    <>
      <div className="reset-overlay" />

      <div className="paper-ball" />

      <div className="trash-can">
      <div className="trash-lid" />
        🗑️
      </div>
    </>
  );
};