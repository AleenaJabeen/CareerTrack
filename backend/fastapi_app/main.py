from fastapi import FastAPI 
from schemas.jobs import JobCreate

app=FastAPI()
@app.get("/")
def home():
    return "WELCOME TO CAREER PAGE"

@app.get("/api/jobs")
def get_jobs():
    return {
        "message":"Fetching Job Application sucessfull",
    }
@app.post("/api/jobs")
def create_job(job:JobCreate):
    return {
        "message":"Job Application created Successfully",
        "job":job
    }