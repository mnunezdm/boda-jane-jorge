"use client";

import ClipLoader from "react-spinners/ClipLoader";

export function LoadingButton({
  className,
  loading,
  staleText,
  loadingText,
  type,
  disabled,
}) {
  return (
    <button className={className} type={type} disabled={loading || disabled}>
      {loading ? (
        <div className="button-spinner-container">
          <div className="button-spinner-innter-container">
            <ClipLoader size={30} color="#CCC"></ClipLoader>
          </div>
          {loadingText}
        </div>
      ) : (
        staleText
      )}
    </button>
  );
}
