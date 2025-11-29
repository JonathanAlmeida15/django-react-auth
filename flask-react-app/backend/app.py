from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields
from datetime import datetime

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ✅ MODEL
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    done = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# ✅ SCHEMA (serialize JSON)
class TaskSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True)
    description = fields.Str()
    done = fields.Bool()
    created_at = fields.DateTime()

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

# ✅ CRIAR BANCO
with app.app_context():
    db.create_all()


# ✅ ROTAS
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.order_by(Task.created_at.desc()).all()
    return tasks_schema.dump(tasks)

@app.route('/api/tasks', methods=['POST'])
def create_task():
    data = request.json
    task = Task(
        title=data.get('title'),
        description=data.get('description')
    )
    db.session.add(task)
    db.session.commit()
    return task_schema.dump(task), 201

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get_or_404(task_id)
    data = request.json
    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.done = data.get('done', task.done)
    db.session.commit()
    return task_schema.dump(task)

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Deleted'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
