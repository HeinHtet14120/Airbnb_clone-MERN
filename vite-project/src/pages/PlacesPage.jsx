import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";


export default function PlacesPage (){

    const [places,setPlaces] = useState([])

    useEffect(() => {
        axios.get('/user-places').then(({data})=>{
            setPlaces(data)
        })
    },[])
    return(
        <div>
            <AccountNav/>
            <div className=" text-right">
                <Link className=" inline-flex gap-2 bg-primary py-2 px-3 text-white rounded-full" to={"/account/places/new"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                New
                </Link>
            </div>
            <div className=" mt-4">
                {places.length>0 && places.map(place => (
                <Link to={'/account/places/'+ place._id} className="flex mb-2 bg-gray-100 cursor-pointer gap-4 p-4 rounded-xl">
                    <div className=" flex w-32 h-32 bg-gray-400 grow shrink-0 rounded-lg overflow-hidden">
                        <PlaceImg place={place}/>
                    </div>
                    <div className=" grow-0 shrink">
                        <h2 className="text-xl">{place.title}</h2>
                        <p className="text-md mt-2">{place.description}</p>
                    </div>
                </Link>
                
            ))}</div>

        </div>
    )
}