from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    role: str

class RideCreate(BaseModel):
    rider_id: int
    pickup: str
    dropoff: str