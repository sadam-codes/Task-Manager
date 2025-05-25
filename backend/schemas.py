from tortoise.contrib.pydantic import pydantic_model_creator
from models import Task

TaskIn = pydantic_model_creator(Task, name="TaskIn") 
TaskOut = pydantic_model_creator(Task, name="TaskOut")
