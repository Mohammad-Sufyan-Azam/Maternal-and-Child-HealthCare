from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os


from txttojsonparser import *  
#working code
app = Flask(__name__)
CORS(app)  # This allows CORS for all domains

UPLOAD_FOLDER = './uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def handle_upload():
    file = request.files['file']
    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Here, you call the function to process the file after saving it
        try:
            user_info = (0, [], [])  # Replace with actual user info if available
            processed_data = store_json(filepath, store=True, user_info=user_info)
            store_json(processed_data, name=f"processed_{filename}.json")  # This assumes the store_json function from your script

            # If you want to push the data to MongoDB, call the push_to_mongo function here
            # push_to_mongo(processed_data)
            
            return jsonify({'message': 'File uploaded and processed successfully', 'filename': filename})
        except Exception as e:
            print(e)
            return jsonify({'error': 'Processing failed', 'filename': filename}), 500

    return jsonify({'error': 'No file found'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
