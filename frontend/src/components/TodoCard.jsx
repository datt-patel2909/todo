import React, { useState } from 'react';
import './TodoCard.css';
import { FiCheck, FiTrash2, FiEdit2, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

const getTint = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 360;
};

const TodoCard = ({ todo, onToggle, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(todo.name);
    const [editDesc, setEditDesc] = useState(todo.description);

    const handleUpdate = () => {
        if (editName.trim() && editDesc.trim()) {
            onUpdate(todo._id, { name: editName, description: editDesc, completed: todo.completed });
            setIsEditing(false);
        }
    };

    const hue = getTint(todo._id || todo.name);
    const customStyle = {
        background: todo.completed
            ? 'rgba(30, 41, 59, 0.4)'
            : `linear-gradient(145deg, rgba(30,41,59,0.9) 0%, hsla(${hue}, 50%, 20%, 0.8) 100%)`,
        borderColor: todo.completed
            ? 'rgba(255,255,255,0.05)'
            : `hsla(${hue}, 50%, 40%, 0.5)`
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            whileHover={{ y: -6, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={customStyle}
            className={`todo-card ${todo.completed ? 'completed' : ''}`}
        >
            <button
                className={`checkbox ${todo.completed ? 'checked' : ''}`}
                onClick={() => onToggle(todo._id, !todo.completed)}
                aria-label="Toggle completion"
            >
                {todo.completed && <FiCheck size={16} />}
            </button>

            <div className="todo-content">
                {isEditing ? (
                    <div className="edit-form">
                        <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="edit-input name-input"
                            maxLength={20}
                        />
                        <textarea
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                            className="edit-input desc-input"
                        />
                    </div>
                ) : (
                    <>
                        <h3 className="todo-name">{todo.name}</h3>
                        <p className="todo-desc">{todo.description}</p>
                    </>
                )}
            </div>

            <div className="actions">
                {isEditing ? (
                    <>
                        <button className="action-btn success" onClick={handleUpdate} aria-label="Save">
                            <FiCheck />
                        </button>
                        <button className="action-btn cancel" onClick={() => setIsEditing(false)} aria-label="Cancel">
                            <FiX />
                        </button>
                    </>
                ) : (
                    <>
                        <button className="action-btn edit" onClick={() => setIsEditing(true)} aria-label="Edit">
                            <FiEdit2 />
                        </button>
                        <button className="action-btn delete" onClick={() => onDelete(todo._id)} aria-label="Delete">
                            <FiTrash2 />
                        </button>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default TodoCard;
