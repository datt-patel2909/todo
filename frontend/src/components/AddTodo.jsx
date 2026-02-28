import React, { useState } from 'react';
import './AddTodo.css';
import { FiPlus } from 'react-icons/fi';

const AddTodo = ({ onAdd }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !description.trim()) {
            setError('Both name and description are required.');
            return;
        }
        if (name.length > 20) {
            setError('Name cannot exceed 20 characters.');
            return;
        }

        onAdd({ name, description });
        setName('');
        setDescription('');
        setIsExpanded(false);
        setError('');
    };

    if (!isExpanded) {
        return (
            <button className="add-todo-btn-initial glass-panel" onClick={() => setIsExpanded(true)}>
                <FiPlus size={24} />
                <span>Add New Task</span>
            </button>
        );
    }

    return (
        <form className="add-todo-form glass-panel" onSubmit={handleSubmit}>
            <h3 className="form-title">Create New Task</h3>

            {error && <div className="error-msg">{error}</div>}

            <div className="input-group">
                <label htmlFor="name">Task Name (Max 20 chars)</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        if (error) setError('');
                    }}
                    placeholder="E.g., Workout, Study"
                    maxLength={20}
                    autoFocus
                />
                <span className="char-count">{name.length}/20</span>
            </div>

            <div className="input-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        if (error) setError('');
                    }}
                    placeholder="Add detailed steps or notes here..."
                    rows={3}
                />
            </div>

            <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsExpanded(false)}>
                    Cancel
                </button>
                <button type="submit" className="btn-submit">
                    Add Task
                </button>
            </div>
        </form>
    );
};

export default AddTodo;
