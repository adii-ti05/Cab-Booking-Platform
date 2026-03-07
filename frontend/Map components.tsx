"use client";

import { useEffect, useState } from "react";
import {
MapContainer,
TileLayer,
Marker,
Popup,
Polyline
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapComponents() {

const [pickup,setPickup]=useState("")
const [drop,setDrop]=useState("")

const [pickupCoords,setPickupCoords]=useState<[number,number] | null>(null)
const [dropCoords,setDropCoords]=useState<[number,number] | null>(null)

const [route,setRoute]=useState<[number,number][]>([])
const [distance,setDistance]=useState<number>(0)

const [ride,setRide]=useState("bike")

const [fare,setFare]=useState({
bike:0,
auto:0,
cab:0
})

const [rider,setRider]=useState({
name:"Rohit Sharma",
phone:"1234567890",
bike:"Honda Shine",
number:"MP04AB1234",
image:"https://randomuser.me/api/portraits/men/32.jpg",
otp:Math.floor(1000+Math.random()*9000)
})

const [rideBooked,setRideBooked]=useState(false)

const bhopal:[number,number]=[23.2599,77.4126]

useEffect(()=>{

delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
iconRetinaUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
iconUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
shadowUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
})

},[])


// CURRENT LOCATION
function detectLocation(){

navigator.geolocation.getCurrentPosition((pos)=>{

const lat=pos.coords.latitude
const lng=pos.coords.longitude

setPickupCoords([lat,lng])
setPickup("Current Location")

})

}


// SEARCH PLACE
async function searchPlace(query:string){

if(query.length<3) return

const url=`https://nominatim.openstreetmap.org/search?format=json&q=${query}`

const res=await fetch(url)

const data=await res.json()

if(data.length){

const lat=parseFloat(data[0].lat)
const lon=parseFloat(data[0].lon)

setDropCoords([lat,lon])

}

}


// ROUTE + DISTANCE
useEffect(()=>{

if(pickupCoords && dropCoords){

const dist=
Math.sqrt(
Math.pow(pickupCoords[0]-dropCoords[0],2)+
Math.pow(pickupCoords[1]-dropCoords[1],2)
)*111

setDistance(dist)

setFare({
bike:Math.round(dist*5),
auto:Math.round(dist*8),
cab:Math.round(dist*12)
})

setRoute([
pickupCoords,
dropCoords
])

}

},[pickupCoords,dropCoords])


return(

<div className="w-full h-screen flex flex-col">

{/* MAP */}

<div className="h-[55%] w-full">

<MapContainer
center={bhopal}
zoom={13}
className="h-full w-full"
>

<TileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

{pickupCoords && <Marker position={pickupCoords}><Popup>Pickup</Popup></Marker>}

{dropCoords && <Marker position={dropCoords}><Popup>Drop</Popup></Marker>}

{route.length>0 && (

<Polyline
positions={route}
pathOptions={{color:"black",weight:5}}
/>

)}

</MapContainer>

</div>


{/* BOTTOM PANEL */}

<div className="flex-1 bg-white p-4 space-y-4 shadow-xl rounded-t-3xl">

{/* INPUTS */}

<input
className="w-full border p-3 rounded-xl text-black font-medium"
placeholder="Enter pickup location"
value={pickup}
onChange={(e)=>setPickup(e.target.value)}
/>

<button
onClick={detectLocation}
className="text-black text-sm font-semibold"
>
Use Current Location
</button>

<input
className="w-full border p-3 rounded-xl text-black font-medium"
placeholder="Enter drop location"
value={drop}
onChange={(e)=>{
setDrop(e.target.value)
searchPlace(e.target.value)
}}
/>


{/* DISTANCE */}

{distance>0 &&(

<div className="text-black font-semibold">
Distance: {distance.toFixed(2)} km
</div>

)}


{/* RIDE OPTIONS */}

<div className="grid grid-cols-3 gap-3">

<button
onClick={()=>setRide("bike")}
className="border p-3 rounded-xl text-black"
>
Bike ₹{fare.bike}
</button>

<button
onClick={()=>setRide("auto")}
className="border p-3 rounded-xl text-black"
>
Auto ₹{fare.auto}
</button>

<button
onClick={()=>setRide("cab")}
className="border p-3 rounded-xl text-black"
>
Cab ₹{fare.cab}
</button>

</div>


{/* BOOK RIDE */}

<button
onClick={()=>setRideBooked(true)}
className="w-full bg-black text-white p-4 rounded-xl font-bold"
>
Book Ride
</button>


{/* RIDER DETAILS */}

{rideBooked &&(

<div className="border p-4 rounded-xl space-y-2">

<div className="flex items-center gap-3">

<img
src={rider.image}
className="w-12 h-12 rounded-full"
/>

<div>

<p className="text-black font-bold">{rider.name}</p>
<p className="text-black text-sm">{rider.bike}</p>

</div>

</div>

<p className="text-black">Bike Number: {rider.number}</p>

<p className="text-black font-bold">
OTP: {rider.otp}
</p>

<a
href={`tel:${rider.phone}`}
className="block bg-black text-white text-center p-2 rounded-lg"
>
Call Rider
</a>

</div>

)}

</div>

</div>

)

}