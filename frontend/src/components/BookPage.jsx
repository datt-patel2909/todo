import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './BookPage.css';
import TodoCard from './TodoCard';

const BookPage = ({
    todo,
    index,
    currentPage,
    totalPages,
    onToggle,
    onUpdate,
    onDelete,
    onNext,
    onPrev
}) => {
    const clickTimer = useRef(null);

    // Is this page currently the active one being viewed?
    const isActive = index === currentPage;
    // Is this page flipped over (to the left)?
    const isFlipped = index < currentPage;

    // Calculate a slight staggered offset so the pages look stacked
    const zIndex = isFlipped ? index : totalPages - index;
    const rotateY = isFlipped ? -180 : 0;

    const handlePageClick = (e) => {
        // Prevent flipping if interacting with todo actions (buttons/inputs)
        if (e.target.closest('.actions') || e.target.closest('.checkbox') || e.target.closest('.edit-form')) return;

        if (clickTimer.current) {
            // Double click detected
            clearTimeout(clickTimer.current);
            clickTimer.current = null;
            onPrev();
        } else {
            // Single click detected, wait to see if it's a double click
            clickTimer.current = setTimeout(() => {
                clickTimer.current = null;
                onNext();
            }, 250);
        }
    };

    return (
        <motion.div
            className={`book-page ${isActive ? 'active' : ''} ${isFlipped ? 'flipped' : ''}`}
            initial={false}
            animate={{
                rotateY,
                zIndex,
            }}
            transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 60,
                damping: 14
            }}
            style={{
                originX: 0, // Pivot from the left spine
            }}
        >
            <div
                className="page-front"
                onClick={handlePageClick}
                title="Tap to go forwards, Double-tap to go backwards"
                style={{ cursor: 'pointer' }}
            >
                <div className="page-header">
                    <span className="page-number">Task {index + 1} of {totalPages}</span>
                </div>

                <div className="page-content">
                    <TodoCard
                        todo={todo}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                </div>
            </div>

            <div className="page-back">
                <div className="watermark">Task {index + 1}</div>
            </div>
        </motion.div>
    );
};

export default BookPage;
