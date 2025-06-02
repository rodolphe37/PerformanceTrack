import React from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  children,
}) => {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <button onClick={() => onOpenChange(false)} style={styles.closeBtn}>
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  dialog: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "8px",
    maxWidth: "700px",
    width: "100%",
    position: "relative",
    boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
  },
  closeBtn: {
    position: "absolute",
    top: "12px",
    right: "16px",
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
  },
};
