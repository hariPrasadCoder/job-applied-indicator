import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
app.config['DEBUG'] = True
CORS(app)

def read_job_ids():
    try:
        job_ids_df = pd.read_csv('jotterwolf_export.csv')
        
        # Extract job IDs using regex
        job_ids = job_ids_df['Job Link'].str.extract(r'/(\d+)$')
        
        # Convert to a list and remove any NaN values
        job_ids_list = job_ids[0].dropna().tolist()
        
        return job_ids_list
    except FileNotFoundError:
        print("Error: job_ids.csv file not found.")
        return []

@app.route('/job_ids', methods=['GET'])
def get_job_ids():
    job_ids = read_job_ids()
    return jsonify(job_ids)

if __name__ == '__main__':
    app.run(debug=True, port=5000)