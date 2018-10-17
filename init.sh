cd ..
virtualenv -p python3 env
source env/bin/activate
cd micro-book
pip install -r requierement.txt
export FLASK_APP=app.py
flask run