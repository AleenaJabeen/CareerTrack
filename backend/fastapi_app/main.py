from fastapi import FastAPI ,Depends,HTTPException
from sqlalchemy.orm import Session
from fastapi_app.schemas.jobs import JobCreate,JobUpdate
from fastapi_app.models.jobs import JobApplication
from .database import Base,engine,SessionLocal
from fastapi import status


app = FastAPI(
    title="CareerTrack API",
    description="Job Application Management API",
    version="1.0.0"
)
Base.metadata.create_all(bind=engine)

def get_db():
    db=SessionLocal()

    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return "WELCOME TO CAREER PAGE"

@app.get("/api/jobs")
def get_jobs(db:Session=Depends(get_db)):
    jobs=db.query(JobApplication).all()
    return {
        "message":"Fetching Job Application sucessfull",
         "count": len(jobs),
        "jobs":jobs
    }


@app.post("/api/jobs")
def create_job(job:JobCreate,db:Session=Depends(get_db)):
    new_job = JobApplication(
        company=job.company,
        position=job.position,
        location=job.location,
        salary=job.salary,
        status=job.status
    )
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return {
        "message": "Job application created successfully",
        "job": {
            "id": new_job.id,
            "company": new_job.company,
            "position": new_job.position,
            "location": new_job.location,
            "salary": new_job.salary,
            "status": new_job.status
        }
    }
@app.get("/api/job/{job_id}")
def get_job_by_id(job_id:int,db:Session=Depends(get_db)):
    job=db.query(JobApplication).filter(
        JobApplication.id==job_id
    ).first()
    if(job is None):
        raise HTTPException(
            status_code=404,
            detail="Job application not found"
        )

    return job

@app.put("/api/job/{job_id}")
def update_job(job_id:int,job_data:JobUpdate,db:Session=Depends(get_db)):
    job = db.query(JobApplication).filter(
        JobApplication.id == job_id
    ).first()

    if job is None:
        raise HTTPException(
            status_code=404,
            detail="Job application not found"
        )
    update_data = job_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(job, field, value)

    db.commit()
    db.refresh(job)
    return job


@app.delete("/api/jobs/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job(
    job_id: int,
    db: Session = Depends(get_db)
):
    job = db.query(JobApplication).filter(
        JobApplication.id == job_id
    ).first()

    if job is None:
        raise HTTPException(
            status_code=404,
            detail="Job application not found"
        )

    db.delete(job)
    db.commit()

    return None

