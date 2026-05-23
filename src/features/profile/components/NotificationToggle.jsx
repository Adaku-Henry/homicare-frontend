import { useState } from "react";

const NotificationToggle = ({ label }) => {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="flex justify-between p-2">
      <span>{label}</span>

      <input
        type="checkbox"
        checked={enabled}
        onChange={() => setEnabled(!enabled)}
      />
    </div>
  );
};

export default NotificationToggle;