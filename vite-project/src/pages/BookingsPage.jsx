import axios from "axios"
import { useEffect, useState } from "react"
import AccountNav from "../AccountNav"
import PlaceImg from "../PlaceImg"

import { Link } from "react-router-dom"
import BookingDate from "../BookingDate"

export default function BookingsPage(){

    const [bookings,setBookings] = useState([])
    
    useEffect(() => {
        axios.get('/bookings').then(response =>{
            setBookings(response.data);
        });
    },[])

    return (
        <div>
            <AccountNav/>
            <div>
                {bookings?.length > 0 &&  bookings.map(booking => (
                    <Link to={`/account/bookings/${booking._id}`} key={booking._id} className="flex mb-2 bg-gray-100 cursor-pointer gap-4 p-4 rounded-xl">
                        <div className=" flex w-32 h-32 bg-gray-400 grow-0 shrink-0 rounded-lg overflow-hidden">
                        <PlaceImg place={booking.place}/>
                        </div>
                        <div className=" grow-0 shrink">
                            <div className=" border-b py-2">
                            <h2 className="text-xl">{booking.place.title}</h2>
                            <BookingDate booking={booking}/>
                            </div>
            
                        
                        <p className="text-md mt-2">Total Price : $ {booking.price}</p>

                    </div>

                    </Link>
                ))}
            </div>
        
            
        </div>
    )
}