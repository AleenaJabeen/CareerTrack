from fastapi import FastAPI ,Depends,HTTPException
from sqlalchemy.orm import Session
from fastapi_app.schemas.jobs import JobCreate,JobUpdate
from fastapi_app.schemas.user import UserCreate,Token,UserLogin
from fastapi_app.models.jobs import JobApplication
from fastapi_app.database import Base,engine,SessionLocal
from fastapi import status
from fastapi_app.models.user import User
from fastapi_app.auths.utils import hash_password,verify_password
from fastapi_app.auths.security import create_access_token


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
@app.post("/api/auth/register", status_code=201)
def register_user(
    user_data: UserCreate,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.email == user_data.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email is already registered"
        )

    hashed_password = hash_password(user_data.password)

    new_user = User(
        name=user_data.name,
        email=user_data.email,
        password_hash=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@app.post("/api/auth/login",response_model=Token)
def login_user(
    user_data:UserLogin,
    db:Session=Depends(get_db)
):
    user=db.query(User).filter(
        User.email==user_data.email
    ).first()

    if user is None:
        raise HTTPException(
             status_code=401,
            detail="Invalid email or password"
        )
    password_valid= verify_password(
        user_data.password,
        user.password_hash
    )
    if not password_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )
    access_token=create_access_token(user.id)
    return {
        "access_token":access_token,
        "token_type":"bearer"
    }
