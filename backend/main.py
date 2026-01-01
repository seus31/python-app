#!/usr/bin/python3
from flask import Flask, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager

import router
from config import config
import db


def create_app():
    app = Flask(__name__)

    app.config.from_object(config.Config)
    db.init_db(app)
    JWTManager(app)
    app.register_blueprint(router.router)

    app.config['JSON_AS_ASCII'] = False
    app.config["JSON_SORT_KEYS"] = False
    CORS(app)

    return app


app = create_app()
if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=8080, threaded=True, use_reloader=True)
