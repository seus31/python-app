from db import db, ma
from sqlalchemy.dialects.mysql import TIMESTAMP as Timestamp
from sqlalchemy.sql.functions import current_timestamp
from werkzeug.security import generate_password_hash


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String(225), nullable=False)
    email = db.Column(db.String(225), nullable=False, unique=True)
    password = db.Column(db.String(225), nullable=False)
    created_at = db.Column(Timestamp, server_default=current_timestamp(), nullable=False)
    updated_at = db.Column(Timestamp, server_default=current_timestamp(), nullable=False)

    # Contractor
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

    def __repr__(self):
        return '<User %r>' % self.name

    def get_user_list():
        user_list = db.session.query(User).all()
        if user_list is None:
            return []
        else:
            return user_list

    def get_user_by_id(id):
        return db.session.query(User) \
            .filter(User.id == id) \
            .one()

    def create_user(self):
        record = User(
            name=self.name,
            password=self.password,
            email=self.email
        )
        db.session.add(record)
        db.session.commit()
        return self

    def update_user(self, updated_data):
        for key, value in updated_data.items():
            if key == 'password':
                value = generate_password_hash(value)
            setattr(self, key, value)

        db.session.commit()

    def delete_user(self):
        db.session.delete(self)
        db.session.commit()


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
