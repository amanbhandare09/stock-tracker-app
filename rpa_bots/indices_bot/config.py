import os
from dotenv import load_dotenv

load_dotenv()

def get_env_variable(var_name):
    return os.getenv(var_name)

LINK_ALL_INDICES = get_env_variable('LINK_ALL_INDICES')
BASE_URL = get_env_variable("BASE_URL")
