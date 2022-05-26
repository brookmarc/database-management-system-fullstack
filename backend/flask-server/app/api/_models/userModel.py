import os
from app import db
import datetime
import jwt
from flask_bcrypt import Bcrypt
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv

# Using PassLib to hash, and the custom_app_context is based on sha256_crypt hasing algorithm
#from passlib.apps import custom_app_context as pwd_context

ACCESS = {
  'superuser': 0,
  'admin': 1,
  'user': 2,
}

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(155))
    username = db.Column(db.String(155), index=True, unique=True)
    password = db.Column(db.String(255))
    accesslevel = db.Column(db.Integer)

    def __init__(self, fullname="", username="", password="123123", accesslevel=ACCESS['user']):
        self.fullname = fullname
        self.username = username
        self.password = Bcrypt().generate_password_hash(password).decode()
        self.accesslevel = accesslevel

    def __repr__(self):
        return "<User: {}>".format(self.fullname)

    @staticmethod
    def hashed_pwd(password):
        return Bcrypt().generate_password_hash(password).decode()

    @staticmethod
    def pwd_is_valid(hashedpwd, password):
        return Bcrypt().check_password_hash(hashedpwd, password)

    @staticmethod
    def generate_token(fullname, username, password, accessLevel):
        try:
            secretKey = os.getenv("SECRET_KEY")
            payload = {
              "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=120),
              "iat": datetime.datetime.utcnow(),
              "user_fullname": fullname,
              "user_name": username,
              "user_pwd": password,
              "access_level": accessLevel
            }
            jwt_token = jwt.encode(
               payload,
               secretKey,
               algorithm='HS256'
            )
            return {"ok": True, "token": jwt_token }
        except Exception as e:
            print (str(e))
            return {'ok': False, 'error': str(e)}
    
    @staticmethod
    def commit():
        db.session.commit()

    @staticmethod
    def save(data):
        db.session.add(data)
        db.session.commit()

    @staticmethod
    def delete(data):
        db.session.delete(data)
        db.session.commit()



