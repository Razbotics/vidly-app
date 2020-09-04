import React from "react";

const Toast = ({ errors }) => {
  const keys = Object.keys(errors);
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{ position: "relative", minHeight: "200px" }}
    >
      <div style={{ position: "absolute", top: "0", right: "0" }}>
        {keys.map((key) => (
          <div
            key={key}
            className="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true">
            <div className="toast-header">
              <strong className="mr-auto">{key}</strong>
              <small className="text-muted">2 seconds ago</small>
              <button
                type="button"
                className="ml-2 mb-1 close"
                data-dismiss="toast"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="toast-body">{errors[key]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toast;
