import os
from flask import Blueprint, jsonify, request, json, abort
import jwt
import datetime
from app import db
from flask_restx import Api, Resource 
from app.api._models.userModel import User, ACCESS
from flask_cors import cross_origin
from .access_manager import accessRestrict
from dotenv import load_dotenv

bp_auth = Blueprint('auth', __name__,)
auth_api = Api(bp_auth)
load_dotenv()

# LOGIN WITH TOKEN
class Loginwithtoken(Resource):
    @cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
    def post(self):
        _json = request.json
        login_user = _json['username']
        print(login_user, ' user login starting ...')
        login_pwd = _json['password']
        user = User.query.filter(User.username == login_user).first()

        try:
            if user:
                hashedPwd = user.password
                isPwdValid = False
                if User.pwd_is_valid(hashedPwd, login_pwd):
                    isPwdValid = True

                if isPwdValid:
                    tokenObj = User.generate_token(
                      user.fullname, 
                      user.username, 
                      user.password, 
                      user.accesslevel
                    )
                    access_token = ""
                    login_succ = {}
                    if tokenObj['ok'] == True:
                        access_token = tokenObj['token']
                        login_succ = {
                          "accessToken": access_token,
                          "fullname": user.fullname,
                        }
                        login_succ['success'] = True
                        login_succ['message'] = "Login successful!"
                        print(login_user, ' login successful!')
                        return jsonify(login_succ)

                    return jsonify({
                      'success': False,
                      'message': '用户名或密码错误!'
                    })
                return jsonify({
                    'success': False,
                    'message': '密码错误，请输入正确密码！'
                })
            return jsonify({
              'success': False,
              'message': '用户名错误，请输入正确用户名！'
            })
        except Exception as e:
            print(type(e))
            print(e.args)

auth_api.add_resource(Loginwithtoken, '/login')


class RefetchToken(Resource):
    @cross_origin(origin='*', headers=['access-control-allow-origin', 'Content-Type'], supports_credentials=True)
    @accessRestrict(access_level=ACCESS['user'])
    def post(self):
        _json = request.json
        #print(_json)
        curr_user = _json["username"]
        user = User.query.filter(User.username == curr_user).first()

        try:
            if user:
                print(curr_user, ' starting refetch token...')
                tokenObj = User.generate_token(
                  user.fullname,
                  user.username,
                  user.password,
                  user.accesslevel
                )
                #print(tokenObj)
                access_token = ""
                refetchToken = {}
                if tokenObj['ok'] == True:
                    access_token = tokenObj["token"]
                    refetchToken = {
                      "accessToken": access_token,
                    }
                    refetchToken["success"] = True
                    print(curr_user, ' refetch token successful!')
                    return jsonify(refetchToken)
                return jsonify({
                  'success': False,
                  'message': 'Failed to refetch token!'
                })
            return jsonify({
              'success': False,
              'message': 'The refetch username is invalid!'
            })

        except Exception as e:
            print(type(e))
            print(e.args)

auth_api.add_resource(RefetchToken, '/refetch-token')

