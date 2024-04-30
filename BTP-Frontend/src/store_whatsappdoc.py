from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app) 
# Ensure the upload directory exists
UPLOAD_FOLDER = './uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def handle_upload():
    file = request.files['file']
    if file:
        filename = secure_filename(file.filename)  # Ensure the filename is safe to use
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)  # Save the file to the uploads directory
        return jsonify({'message': 'File uploaded successfully', 'filename': filename})
    return 'No file found', 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
