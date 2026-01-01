from service.auth_service import login_logic
from service.auth_service import register_logic


def login():
    return login_logic()


def register():
    return register_logic()
