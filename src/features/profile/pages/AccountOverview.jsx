const AccountOverview = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">

      <h2 className="text-xl font-bold mb-4">Account Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Total Bookings</p>
          <h3 className="text-2xl font-bold">24</h3>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Completed Jobs</p>
          <h3 className="text-2xl font-bold">18</h3>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Spending</p>
          <h3 className="text-2xl font-bold">UGX 320,000</h3>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Ratings Given</p>
          <h3 className="text-2xl font-bold">4.6 ⭐</h3>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Favorite Providers</p>
          <h3 className="text-2xl font-bold">5</h3>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Wallet Balance</p>
          <h3 className="text-2xl font-bold">UGX 50,000</h3>
        </div>

      </div>

    </div>
  );
};

export default AccountOverview;