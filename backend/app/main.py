from fastapi import FastAPI

app = FastAPI(title="Cab Booking API")

@app.get("/")
def read_root():
    return {"message": "Welcome to Cab Booking API"}
