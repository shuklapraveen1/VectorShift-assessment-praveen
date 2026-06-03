import { useEffect } from "react";

export const Notification = ({
  message,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(
      onClose,
      2500
    );

    return () =>
      clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: 80,
        right: 20,
        background:
          "#0F172A",
        color: "white",
        padding:
          "12px 20px",
        borderRadius: 12,
        zIndex: 99999,
        boxShadow:
          "0 8px 25px rgba(0,0,0,.35)",
      }}
    >
      {message}
    </div>
  );
};