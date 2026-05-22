import { useEffect, useState } from "react";
import { CheckCircle, WarningCircle, Warning } from "@phosphor-icons/react";

export default function Toast({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} remove={removeToast} />
      ))}
    </div>
  );
}

function ToastItem({ toast, remove }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => remove(toast.id), 300);
    }, toast.duration || 3000);
    return () => clearTimeout(timer);
  }, [toast, remove]);

  const iconMap = {
    success: <CheckCircle size={20} weight="fill" className="toast-icon success" />,
    error: <WarningCircle size={20} weight="fill" className="toast-icon error" />,
    warning: <Warning size={20} weight="fill" className="toast-icon warning" />,
  };

  return (
    <div className={`toast toast-${toast.type || "success"} ${exiting ? "toast-exit" : ""}`}>
      {iconMap[toast.type || "success"]}
      <span>{toast.message}</span>
    </div>
  );
}
