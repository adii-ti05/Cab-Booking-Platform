from fastapi import APIRouter
from .. import models, schemas, database

router= APIRouter()

@router.post("/rides")
def request_ride(ride:schemas.RideCreate):
    db = database.SessionLocal()
    new_ride = models.Ride(**ride.dict(),fare=100.0)
    db.add(new_ride)
    db.commit()
    db.refresh(new_ride)
    return new_ride

