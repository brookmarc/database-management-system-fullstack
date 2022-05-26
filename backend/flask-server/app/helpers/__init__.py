


#import jwt
#import datetime
#
#def generate_accessToken(*args):
#    accessToken = jwt.encode(*args, JWT_SECRET_KEY, algorithm='HS256')
#    #encoded_content = jwt.encode(*args, JWT_SECRET_KEY, algorithm='HS256')
#    #token = str(encoded_content).split("'")[1]
#    return accessToken
#
#def validate_user(username, password):
#    current_user = User.query.filter(User.userName == username).first()
#
#    if len(current_user) == 1:
#        saved_password_hash = current_user[0]["password_hash"]
#        password_hash = generate_hash(password)
#
#        if password_hash == saved_password_hash:
#            payload = {
#              'user_id': current_user.id
#              'user_name': current_user.userName,
#              'user_role': current_user.userRole,
#              'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
#            }
#            accessToken = generate_accessToken(payload)
#            return accessToken
#        else:
#            return False
#    else:
#        return False

