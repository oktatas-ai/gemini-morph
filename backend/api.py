from flask import Flask, request, jsonify, send_file
import subprocess
import uuid
import os

app = Flask(__name__)

@app.route('/render', methods=['POST'])
def render_tikz():
    latex_code = request.json.get('latex_code')
    if not latex_code:
        return jsonify({'error': 'No LaTeX/TikZ code provided'}), 400

    # Generate a unique ID for this request
    request_id = str(uuid.uuid4())

    # Write TikZ code to a .tex file
    with open(f'{request_id}.tex', 'w') as f:
        f.write(latex_code)

    # Compile the .tex file to a PDF
    subprocess.run(['pdflatex', f'{request_id}.tex'], check=True)

    # Convert the PDF to SVG
    subprocess.run(['pdf2svg', f'{request_id}.pdf', f'{request_id}.svg'], check=True)

    # Send the SVG file back
    return send_file(f'{request_id}.svg', mimetype='image/svg+xml')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

