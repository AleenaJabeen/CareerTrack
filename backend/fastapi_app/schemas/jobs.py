# pydantic is used to make rules and shapes for data its different from database
# pydantic model validates the api data while db model represent data store in database
from pydantic import BaseModel
from typing import Optional

class JobCreate(BaseModel):
    company:str
    position:str
    location:str
    salary:Optional[float]=None
    status:str="Applied"
class JobUpdate(BaseModel):
    company: Optional[str] = None
    position: Optional[str] = None
    location: Optional[str] = None
    salary: Optional[float] = None
    status: Optional[str] = None
   