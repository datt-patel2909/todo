import React, { useState, useEffect } from 'react';
import './App.css';
import { getTodos, createTodo, updateTodo, deleteTodo } from './api/todoService';

import AddTodo from './components/AddTodo';
import BookPage from './components/BookPage';
import CoverPage from './components/CoverPage';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Track which page the book is currently open to
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      const todosArray = data.todo || data.todos || data.task || (Array.isArray(data) ? data : []);
      setTodos(todosArray);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch todos", err);
      setError("Failed to load tasks. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const data = await createTodo(todoData);
      const newTodo = data.data || data.todo || data.task || data;
      setTodos([newTodo, ...todos]);
      // Reset to first page so the new task is immediately visible
      setCurrentPage(0);
      setIsBookOpen(true);
    } catch (err) {
      console.error("Failed to add todo", err);
      setError("Failed to add task.");
    }
  };

  const handleToggleTodo = async (id, completed) => {
    try {
      setTodos(todos.map(t => t._id === id ? { ...t, completed } : t));
      await updateTodo(id, { completed });
    } catch (err) {
      fetchTodos();
      console.error("Failed to update status", err);
    }
  };

  const handleUpdateTodo = async (id, updatedData) => {
    try {
      setTodos(todos.map(t => t._id === id ? { ...t, ...updatedData } : t));
      await updateTodo(id, updatedData);
    } catch (err) {
      fetchTodos();
      console.error("Failed to edit todo", err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const newTodos = todos.filter(t => t._id !== id);
      setTodos(newTodos);

      // Prevent current page from going out of bounds
      if (currentPage >= newTodos.length && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }

      await deleteTodo(id);
    } catch (err) {
      fetchTodos();
      console.error("Failed to delete todo", err);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">Daily Tasks Notebook</h1>
        <p className="subtitle">{isBookOpen ? "Flip through your tasks" : "Open the notebook to see your tasks"}</p>
      </header>

      <main className="main-content">
        <AddTodo onAdd={handleAddTodo} />

        <div className="todos-container book-container">
          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="book">
              <CoverPage
                isOpen={isBookOpen}
                onOpen={() => setIsBookOpen(true)}
              />

              {todos.length === 0 && isBookOpen ? (
                <div className="empty-state" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1, borderRadius: '4px 16px 16px 4px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  No tasks inside. Add one!
                </div>
              ) : (
                todos.map((todo, index) => (
                  <BookPage
                    key={todo._id || index}
                    todo={todo}
                    index={index}
                    currentPage={isBookOpen ? currentPage : -1} // -1 forces all pages to be 'covered'
                    totalPages={todos.length}
                    onToggle={handleToggleTodo}
                    onUpdate={handleUpdateTodo}
                    onDelete={handleDeleteTodo}
                    onNext={() => {
                      if (currentPage === todos.length - 1) {
                        setIsBookOpen(false);
                        // Optional: Reset back to page 1 after animation giving illusion of full close
                        setTimeout(() => setCurrentPage(0), 500);
                      } else {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                    onPrev={() => {
                      if (currentPage === 0) {
                        setIsBookOpen(false); // Close book from first page
                      } else {
                        setCurrentPage(currentPage - 1);
                      }
                    }}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
