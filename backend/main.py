from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from tortoise.contrib.fastapi import register_tortoise
from typing import List
from models import Task
from schemas import TaskIn, TaskOut
import config

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/tasks", response_model=TaskOut)
async def create_task(task: TaskIn):
    existing = await Task.get_or_none(id=task.id)
    if existing:
        raise HTTPException(status_code=400, detail="Task with this ID already exists")
    task_obj = await Task.create(**task.dict())
    return await TaskOut.from_tortoise_orm(task_obj)

@app.get("/tasks", response_model=List[TaskOut])
async def get_tasks():
    return await TaskOut.from_queryset(Task.all().order_by("id"))

@app.get("/tasks/{task_id}", response_model=TaskOut)
async def get_task(task_id: int):
    task = await Task.get_or_none(id=task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return await TaskOut.from_tortoise_orm(task)

@app.put("/tasks/{task_id}", response_model=TaskOut)
async def update_task(task_id: int, task_data: TaskIn):
    task = await Task.get_or_none(id=task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.title = task_data.title
    task.description = task_data.description
    await task.save()
    return await TaskOut.from_tortoise_orm(task)

@app.delete("/tasks/{task_id}")
async def delete_task(task_id: int):
    task = await Task.get_or_none(id=task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    await task.delete()
    return {"detail": "Task deleted"}
register_tortoise(
    app,
    config=config.TORTOISE_ORM,
    generate_schemas=True,
    add_exception_handlers=True,
)
