from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def quiz():
    return render_template('quiz.html')

@app.route('/recruitment')
def recruitment():
    return render_template('recruitment.html')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=1040, debug=True)
