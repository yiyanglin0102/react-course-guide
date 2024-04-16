from flask import Flask, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": ["https://course.yiyanglin.com/", "http://localhost:3000"]}})

def load_courses():
    try:
        with open('class_data.json', 'r') as file:
            courses = json.load(file)
        return courses
    except Exception as e:
        app.logger.error(f"Failed to load courses: {e}")
        raise

@app.route('/courses')
def get_courses():
    try:
        courses = load_courses()
        return jsonify(courses)
    except Exception as e:
        app.logger.error(f"Error retrieving courses: {e}")
        return jsonify({"error": "Failed to retrieve courses"}), 500

def load_completed():
    try:
        with open('class_data_previous.json', 'r') as file:
            courses = json.load(file)
        return courses
    except Exception as e:
        app.logger.error(f"Failed to load courses: {e}")
        raise

@app.route('/completed')
def get_completed():
    try:
        courses = load_completed()
        return jsonify(courses)
    except Exception as e:
        app.logger.error(f"Error retrieving courses: {e}")
        return jsonify({"error": "Failed to retrieve courses"}), 500


if __name__ == '__main__':
    app.run()
