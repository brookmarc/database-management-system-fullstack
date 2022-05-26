import os
from flask import jsonify, request, json, abort
import jwt
import datetime
from functools import wraps
from app import db
from .._models.userModel import User, ACCESS
from flask_cors import cross_origin
from dotenv import load_dotenv

load_dotenv()
secret_key = os.getenv("SECRET_KEY")


def accessRestrict(access_level):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            try:
                _header = request.headers
                #print(_header)
                if not 'Authorization' in _header:
                    abort(401)
                    return jsonify({"Error": "A valid token is missing"})
                else:
                    api_token = _header.get('Authorization')
                    #print(api_token)
                    if api_token is not None:
                        data = jwt.decode(api_token, secret_key, algorithms=['HS256'])
                        if not data['access_level'] <= access_level:
                            abort(403)
                            return jsonify({"Error": "You don't have the access level"})
                    else:
                        return jsonify({"Error": "This is empty token"})

                return f(*args, **kwargs)
            except Exception as e:
                Error = e
                print('Access Error: ')
                print(Error)
                return jsonify({'Error code': 403})
        return wrapper
    return decorator



def authorize(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        _header = request.headers
        print(_header)
        if not 'Authorization' in _header:
            abort(401)
            return jsonify({'message': 'a valid token is missing'})
        else:
            accessToken = _header['Authorization']
            try:
                data = jwt.decode(accessToken, secret_key, algorithms=['HS256'])
                current_user = User.query.filter_by(username=data['user_name']).first()
                #print(accessToken)
                #print(current_user)
            except:
                return jsonify({'message': 'token is invalid'})

        return f(current_user, *args, **kwargs)
    return decorator



def validate_api_token(validation_func):
    @wraps(validation_func)
    def decorator(*args, **kwargs):
        _header = request.headers
        print(_header)
        api_token = _header.get('Authorization')
        #api_token = request.headers['Authorization']
        is_valid_api_token = validation_func(api_token)
        if is_valid_api_token:
            print(api_token)
            return validation_func(*args, **kwargs)
        return jsonify('Invalid API Token')
    return decorator

