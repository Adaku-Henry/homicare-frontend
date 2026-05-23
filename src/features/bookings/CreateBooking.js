import React,{useState} from "react"
import BookingSidebar from "../../components/bookings/BookingSidebar"

function CreateBooking(){

const [service,setService]=useState("")
const [provider,setProvider]=useState("")
const [date,setDate]=useState("")
const [payment,setPayment]=useState("wallet")

function submitBooking(e){

e.preventDefault()

alert("Bookings submitted successfully")

}

return(

<div className="booking-layout">

<BookingSidebar/>

<div className="booking-content">

<h2>Create Booking</h2>

<form onSubmit={submitBooking}>

<label>Service</label>

<select
value={service}
onChange={(e)=>setService(e.target.value)}
>

<option>Electrician</option>
<option>Plumber</option>
<option>Cleaner</option>
<option>Home Tutor</option>

</select>

<label>Provider</label>

<input
type="text"
placeholder="Enter provider name"
onChange={(e)=>setProvider(e.target.value)}
/>

<label>Date</label>

<input
type="date"
onChange={(e)=>setDate(e.target.value)}
/>

<label>Payment Method</label>

<select
value={payment}
onChange={(e)=>setPayment(e.target.value)}
>

<option value="wallet">Wallet</option>
<option value="cash">Cash</option>

</select>

<button type="submit">

Confirm Booking

</button>

</form>

</div>

</div>

)

}

export default CreateBooking