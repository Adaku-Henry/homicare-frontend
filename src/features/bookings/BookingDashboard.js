import React from "react";
import BookingSidebar from "../../components/bookings/BookingSidebar";

function BookingDashboard() {

return (

<div className="booking-layout">

<BookingSidebar />

<div className="booking-content">

<h1>Booking Dashboard</h1>

<div className="booking-stats">

<div className="stat">
<h3>Active Bookings</h3>
<p>3</p>
</div>

<div className="stat">
<h3>Completed</h3>
<p>12</p>
</div>

<div className="stat">
<h3>Cancelled</h3>
<p>1</p>
</div>

</div>

</div>

</div>

)

}

export default BookingDashboard