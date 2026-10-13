import { useEffect, useRef, type ReactNode } from "react";

export function WorkspaceDialog({
  title,
  children,
  onClose,
  drawer = false,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  drawer?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    return () => {
      dialog?.close();
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={drawer ? "workspace-dialog drawer" : "workspace-dialog"}
      aria-label={title}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {drawer ? (
        children
      ) : (
        <>
          <div className="dialog-heading">
            <h2>{title}</h2>
            <button className="icon-button" aria-label="Close dialog" onClick={onClose}>
              ×
            </button>
          </div>
          {children}
        </>
      )}
    </dialog>
  );
}
