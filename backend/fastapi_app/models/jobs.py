from sqlalchemy import Column,Integer,String,Float
from fastapi_app.database import Base

class JobApplication(Base):
    __tablename__="job_applications"

    id = Column(Integer, primary_key=True, index=True)
    company = Column(String, nullable=False)
    position = Column(String, nullable=False)
    location = Column(String, nullable=False)
    salary = Column(Float, nullable=True)
    status = Column(String, default="Applied")