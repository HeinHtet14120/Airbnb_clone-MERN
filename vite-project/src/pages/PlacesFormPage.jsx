import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage(){
    const { id } = useParams();
    console.log({id})

    const [title, setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addPhotos,setAddPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfos, setExtraInfos] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests, setMaxGuest] = useState(1);
    const [redirect,setRedirect] = useState(false)
    const [price,setPrice] = useState(100)

    useEffect(() => {
        if(!id){
            return;
        }

        axios.get('/places/'+id).then(response => {
            const {data} = response;

            setTitle(data.title);
            setAddress(data.address);
            setAddPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfos(data.extraInfos);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuest(data.maxGuests)
            setPrice(data.price);
        })
    },[id])

    function inputHeader(text){
        return (
            <h2 className=" text-2xl mt-4 mb-2">{text}</h2>
        )
    }

    function inputDescription(text){
        return (
            <p className=" text-sm text-gray-500 mb-1 mt-1"><span className=" text-primary">* </span>{text}</p>
        )
    }

    function preInput(header, description) {
        return(
            <>
            {inputHeader(header)}
            {inputDescription(description)}
            </>    
        )
    }

    async function savePlace(e){
        e.preventDefault();
        
        if(id){
            console.log("---------------",id)
            const placeData = {
                title,address,addPhotos,
                description,perks,extraInfos,
                checkIn,checkOut,maxGuests,price
            }
            await axios.put('/places',{id,...placeData} )
            console.log(placeData)

        }else{

            const placeData = {
                title,address,addPhotos,
                description,perks,extraInfos,
                checkIn,checkOut,maxGuests,price
            }
            console.log("save")
            await axios.post('/places', placeData)
        }
        

        setRedirect(true)
    }

    if(redirect){
        return <Navigate to={'/account/places'}/>
    }

    return(
    <div>
        <AccountNav/>
        <form onSubmit={savePlace}>
            {preInput('Title','Title should be short and catchy for advertisement')}
            <input type="text" 
                   placeholder="Name" 
                   value={title} 
                   onChange={e => setTitle(e.target.value)}></input>

            {preInput('Address','Address must be completed and understandable')}
            <input type="text" 
                   placeholder="Address" 
                   value={address} 
                   onChange={e => setAddress(e.target.value)}></input>

            {preInput('Photos','HD Resolution')}
            <PhotosUploader addPhotos={addPhotos} onChange={setAddPhotos}/>
            
            {preInput('Description','Description of the place')}
            <textarea value={description} 
                      onChange={e => setDescription(e.target.value)}/>

            {preInput('Perks','Select Availble Perks')}
            <div className=" grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                <Perks selected={perks} onChange={setPerks}/>
            </div>

            {preInput('Extra Info','House Rules etc.')}
            <textarea value={extraInfos} 
                      onChange={e => setExtraInfos(e.target.value)}/>

            {preInput('Check in & out time','Check in, Check out times and max numbers of guest')}

            <div className=" grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                <div className=" mt-2 mb-1">
                    <label>Check In</label>
                    <input value={checkIn} 
                           onChange={e => setCheckIn(e.target.value)} 
                           type="text" 
                           placeholder="14:00"/>
                </div>
                <div className=" mt-2 mb-1">
                    <label>Check Out</label>
                    <input value={checkOut} 
                           onChange={e => setCheckOut(e.target.value)} 
                           type="text" 
                           placeholder="12:00"/>
                </div>
                <div className=" mt-2 mb-1">
                    <label>Max Guest</label>
                    <input value={maxGuests} 
                           onChange={e => setMaxGuest(e.target.value)} 
                           type="number" />
                </div>
                <div className=" mt-2 mb-1">
                    <label>Price pre night</label>
                    <input value={price} 
                           onChange={e => setPrice(e.target.value)} 
                           type="number" />
                </div>
            </div>

            <div className=" flex items-center justify-center">
            <button className="primary my-4 max-w-xl ">Save</button>

            </div>
        </form>
    </div>
    )

}