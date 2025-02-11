from pydantic import BaseModel

class TaskBase(BaseModel):
    title: str
    description: str
    completed: bool

class TaskUpdate(TaskBase):
    pass

class TaskResponse(TaskBase):
    id: int

    class Config:
        orm_mode = True
