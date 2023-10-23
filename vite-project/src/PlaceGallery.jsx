import { useState } from "react";

export default function PlaceGallery({place}){

    const [showAllphotos, setShowAllPhotos] = useState(false);
    const [showDetails,setShowDetails] = useState(null);

    if(showAllphotos){
        return(
            <div className=" absolute bg-white inset-0 min-h-screen">
                <div>
                    <button onClick={() => setShowAllPhotos(false)} className=" fixed right-2 flex gap-1 items-center shadow hover:bg-black hover:text-white text-black p-2 rounded-full m-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <h1 className=" mt-2 pt-4 text-3xl font-semibold text-center">{place.title}</h1>
                </div>
                <button className=" p-8 grid gap-4 grid-cols-3">
                    {place?.photos &&  place?.photos.map(photo => (
                        <div onClick={() => setShowDetails(photo)}    className=" overflow-hidde transition-shadow">
                            <img onClick={() => setShowAllPhotos(false)} className="rounded-sm aspect-square object-cover" src={'http://localhost:4000/upload/'+photo}></img>
                        </div>                        
                    ))}
                </button>
                
            </div>
            
        )
    }

    if(showDetails){
        
        return (
            <>
           
            <dvi className=" absolute bg-white inset-0 min-h-screen">
                <div className=" my-8">
                <div onClick={() => setShowAllPhotos(true)}>
                <button onClick={() => setShowDetails(null)} className=" fixed left-2 flex gap-1 items-center shadow hover:bg-black hover:text-white text-black p-2 rounded-full m-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        
                    </button>
                </div>
                
            <img   className="rounded-lg shadow-lg aspect-square m-auto  object-cover" src={'http://localhost:4000/upload/'+showDetails}></img>
                </div>
            </dvi>
            </>
        )
    }
    return(
        <div>
            <div className=" relative ">
                <div className=" grid gap-2 grid-cols-[2fr_1fr] rounded-lg overflow-hidden">
                    <div>
                        {place.photos?.[0] && (
                            <div>
                                <img onClick={() => setShowAllPhotos(true)}  className= "cursor-pointer  rounded-sm aspect-square object-cover" src={'http://localhost:4000/upload/'+place.photos?.[0]}/>
                            </div>
                        )}
                    </div>
                    <div className="">
                        {place.photos?.[1] && (
                                <img onClick={() => setShowAllPhotos(true)} className="  cursor-pointer rounded-sm aspect-square object-cover" src={'http://localhost:4000/upload/'+place.photos?.[1]}/>
                        )}
                        <div className=" overflow-hidden rounded-sm">
                        {place.photos?.[2] && (
                                <img onClick={() => setShowAllPhotos(true)} className="  cursor-pointer relative top-2 aspect-square object-cover" src={'http://localhost:4000/upload/'+place.photos?.[2]}/>
                        )}
                        </div>
                    </div>
                </div>
                <button onClick={() => setShowAllPhotos(true)} className=" flex gap-1 absolute right-2 bottom-2 bg-slate-400 py-1 px-2 text-sm justify-center items-center rounded-md ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
                </svg>

                    more photos
                </button>
            </div>
        </div>
    )
}