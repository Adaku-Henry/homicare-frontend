const SettingItem = ({ title, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "10px",
        borderBottom: "1px solid #ddd",
        cursor: "pointer",
      }}
    >
      {title}
    </div>
  );
};

export default SettingItem;