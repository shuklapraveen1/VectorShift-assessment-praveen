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