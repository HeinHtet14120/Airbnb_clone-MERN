import { useContext, useEffect, useState } from "react"
import {differenceInCalendarDays} from "date-fns"
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingForm({place}){

    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [guestNumber, setGuestNumber] = useState(1);
    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
    const [redirect,setRedirect] = useState('');

    const {user} = useContext(UserContext);

    useEffect(() => {
        if(user){
            setName(user.name)
        }
    },[user])

    let numberofNights = 0;

    if(checkIn && checkOut){
         numberofNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
         console.log("--------"+numberofNights+"--------")
    }

    async function createBooking () {

        const response = await axios.post('/bookings',{
            name,phone,checkIn,checkOut,guestNumber,
            id:place._id,
            price: numberofNights * place.price,
        });

        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return(
        <div className=" mt-6 gap-2 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className=" my-4">
                        <h1 className=" font-bold text-xl">Description</h1>
                        {place.description}
                    </div>
                    
                    <div>
                        CheckIn Time: {place.checkIn}<br/>
                        CheckOut Time: {place.checkOut} <br/>
                        Max Guest Number : {place.maxGuests}
                    </div>
                </div>
                <div>
                    <div className=" bg-white shadow p-4 rounded-xl">
                        <div className=" mb-2 text-2xl text-center">
                            ${place.price} / per night
                        </div>
                        <div className=" border rounded-xl">
                            <div className=" flex items-center border-b">
                                <div className="py-3 px-4 text-center border-r">
                                <label>CheckIn</label>
                                    <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}/>
                                </div>
                                <div className=" text-center py-3 px-4">
                                <label>CheckOut</label>
                                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}/>
                                </div>
                            </div>
                            <div className=" p-2">
                                <label>Numbers of guest</label>
                                <input type="number" value={guestNumber} onChange={(e) => setGuestNumber(e.target.value)}/>
                            </div>
                            {checkIn && checkOut && guestNumber && (
                            <div className=" p-2">
                                <label>Name :</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                                <label>Phone :</label>
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                                
                            </div>
                            
                            
                            )}
                        </div>
                        <button onClick={createBooking}  className=" primary mt-2">Reserve
                        { checkIn && checkOut  && (
                            <span> ${numberofNights * place.price}</span>
                        )}
                        </button>
                        
                        
                    </div>

                </div>
            </div>
    )
}