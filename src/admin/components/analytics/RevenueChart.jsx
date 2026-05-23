import React from "react";

function RevenueChart({ data }) {
  return (
    <div className="bg-white p-4 rounded shadow">

      <h3 className="font-bold mb-3">Revenue Trend</h3>

      <div className="flex items-end gap-2 h-40">

        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">

            <div
              style={{ height: `${item.value / 10}px` }}
              className="w-6 bg-green-500"
            />

            <span className="text-xs">{item.month}</span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default RevenueChart;