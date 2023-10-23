import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingForm from "../BookingForm";
import PlaceGallery from "../PlaceGallery";

export default function PlacePage(){

    const { id } = useParams();
    const [place,setPlace] = useState(null)
    

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data)
        })
    },[id])

    if(!place) return "Loading..."

    return(
    <>
         <div  className=" mt-4 -mx-9 bg-gray-300">
            <div className=" mx-9 my-4">
                <h1 className=" text-4xl font-extralight py-2">{place.title}</h1>
                <a className=" flex gap-1 mb-2 py-2 items-center text-xs underline font-bold" target="_blank" href={'https://maps.google.com/?q='+place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>

                    {place.address}</a>
                <PlaceGallery place={place}/>
                <BookingForm place={place}/>
            </div>
        </div>
        <div className=" -mx-8 bg-white p-8 rounded-lg mt-5">
            <h2 className=" font-bold text-lg pt-2 pb-2 text-slate-400 leading-4">Extra Infos</h2>
            <div>
            {place.extraInfos}

            </div>
            </div>
            </>
    )
}