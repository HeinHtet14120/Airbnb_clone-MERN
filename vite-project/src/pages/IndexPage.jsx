import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function IndexPage() {

    const [places,setPlaces] = useState();
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data)
        })
    },[])

    return(
        <>
        <div className="  mt-8 gap-x-5 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places && places.map(place => (
                <Link to={'/places/'+place._id}>
                    <div className=" bg-gray-400 rounded-xl ">
                    {place.photos && place.photos.length > 0 && (
                        <img className=" object-cover aspect-square rounded-xl" src={'http://localhost:4000/upload/' + place.photos[0]} />
                    )}
                    </div>
                    <h2 className=" mt-1 mb-1 text-sm font-bold ">{place.address}</h2>
                    <h3 className=" text-xs truncate text-gray-500 ">{place.title}</h3>
                    <div className=" mt-1">
                        <span className=" font-semibold">${place.price}</span> night
                    </div>
                </Link>
            ))}
        </div>
        </>
    )
}