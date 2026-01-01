from db import db, ma
from sqlalchemy.dialects.mysql import TIMESTAMP as Timestamp
from sqlalchemy.sql.functions import current_timestamp


class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    task_name = db.Column(db.String(225), nullable=False)
    status = db.Column(db.Integer, nullable=False)
    created_at = db.Column(Timestamp, server_default=current_timestamp(), nullable=False)
    updated_at = db.Column(Timestamp, server_default=current_timestamp(), nullable=False)

    # Contractor
    def __init__(self, task_name, status):
        self.task_name = task_name
        self.status = status

    def __repr__(self):
        return '<Task %r>' % self.task_name

    def create_task(self):
        record = Task(
            task_name=self.task_name,
            status=self.status
        )
        db.session.add(record)
        db.session.commit()
        return self

    def get_task_list():
        task_list = db.session.query(Task).all()
        if task_list is None:
            return []
        else:
            return task_list

    def update_task(self, updated_data):
        for key, value in updated_data.items():
            setattr(self, key, value)

        db.session.commit()

    def delete_task(self):
        db.session.delete(self)
        db.session.commit()


class TaskSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Task
