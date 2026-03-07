from sqlalchemy import Column, Integer, String, Float, ForeignKey
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    role = Column(String)  # rider / driver

class Ride(Base):
    __tablename__ = "rides"
    id = Column(Integer, primary_key=True)
    rider_id = Column(Integer, ForeignKey("users.id"))
    pickup = Column(String)
    dropoff = Column(String)
    status = Column(String, default="requested")
    fare = Column(Float)