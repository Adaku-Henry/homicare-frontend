import React from "react";

function MediaViewer({ media, onClose }) {
  if (!media) return null;

  return (
    <div className="mediaOverlay" onClick={onClose}>
      {media.type?.startsWith("image") && (
        <img src={media.url} alt="" />
      )}

      {media.type?.startsWith("video") && (
        <video controls src={media.url} />
      )}
    </div>
  );
}

export default MediaViewer;