import axios from "axios";
import { pl } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import PlaceGallery from "../PlaceGallery";
import BookingDate from "../BookingDate";

export default function BookingPage(){
    const {id} = useParams();
    const [bookings,setBookings] = useState(null);


    useEffect(() => {
        if(!id){
            return;
        }
        axios.get(`/bookings`).then(response => {
            const foundBooking = response.data.find(({_id}) => _id === id)
            if(foundBooking){
                setBookings(foundBooking)
            }
        })
    },[id])

    if(!bookings) return "Loading..."

    return (
        <div className=" mt-4 ">
            <h1 className=" text-4xl font-extralight">{bookings.place.title}</h1>
            <a className=" flex gap-1 mb-2 items-center text-xs underline font-bold" target="_blank" href={'https://maps.google.com/?q='+bookings.place.address}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {bookings.place.address}
            </a>

           
                    <div className=" flex justify-between items-center bg-slate-200 py-3 px-4 my-2 rounded-lg">
                        <div>
                        <BookingDate booking={bookings}/>
                        <p className=" my-1 text-sm">Guest Number : {bookings.guestNumber}</p>
                        </div>
        
                        <div className=" rounded-xl text-white bg-primary p-4 text-center">
                        <b>Total Price:</b>
                        <div className=" text-2xl">
                        {bookings.price}
                        </div>

                    </div>
                    </div>
                    
        
        

            <PlaceGallery place={bookings.place}/>
        </div>
    )
}