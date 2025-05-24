import os
from dotenv import load_dotenv

load_dotenv()

def get_env_variable(var_name):
    return os.getenv(var_name)

NSE_URL = get_env_variable('NSE_URL')
CSV_FILE_PATH = get_env_variable('CSV_FILE_PATH')
BASE_URL = get_env_variable("BASE_URL")
