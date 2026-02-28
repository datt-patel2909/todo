import React from 'react';
import { motion } from 'framer-motion';
import './BookPage.css'; // Reusing base CSS 

const CoverPage = ({ isOpen, onOpen }) => {
    // If the book is open, the cover is flipped over to the left
    const rotateY = isOpen ? -180 : 0;

    return (
        <motion.div
            className={`book-page cover-page ${isOpen ? 'flipped' : ''}`}
            initial={false}
            animate={{
                rotateY,
                zIndex: isOpen ? 0 : 100 // High z-index when closed, lowest when open
            }}
            transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 50,
                damping: 16
            }}
            style={{
                originX: 0, // Pivot from spine
                cursor: isOpen ? 'default' : 'pointer'
            }}
            onClick={() => {
                if (!isOpen) onOpen();
            }}
            title={!isOpen ? "Click to open notebook" : ""}
        >
            {/* Front of Cover */}
            <div className="page-front cover-front">
                <img src="/cover.png" alt="Notebook Cover" className="cover-img" />
            </div>

            {/* Back of Cover (Inside front cover) */}
            <div className="page-back cover-back">
                <div className="inside-pattern"></div>
            </div>
        </motion.div>
    );
};

export default CoverPage;
