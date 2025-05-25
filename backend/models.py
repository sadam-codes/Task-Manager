from tortoise import fields, models

class Task(models.Model):
    id = fields.IntField(pk=True, generated=True) 
    title = fields.CharField(max_length=255)
    description = fields.TextField()
