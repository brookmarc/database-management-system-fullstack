from app import create_app
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = create_app()
app.env = "developement"
socketio = SocketIO(app)
#print(app)
#socketio = SocketIO(app, cors_allowed_origins="*")
cors = CORS(app, supports_credentials=True)


@socketio.on('connect')
def connected():
    emit('my response', {'data': 'Connected'}) 

@socketio.on('disconnected')
def disconnected():
    print('Disconnected')

@app.after_request
def add_headers(response):
    response.headers.add('Content-Type', 'application/json')
    #response.headers.add('Access-Control-Allow-Origin', '*')
    #response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3001')
    response.headers.add('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Expose-Headers', 'Content-Type,Content-Length,Authorization,X-Pagination')
    print(response)
    return response


if __name__ == '__main__':
    try:
        socketio.run(app, host='127.1.9.5', port=8080, debug=True)
    except Exception as e:
        print(e)

