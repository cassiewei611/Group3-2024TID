import React from 'react';
import './Comment.css';

const Comment = ({ commentId, author, text, onDelete }) => {
    return (
        <div className="comment">
            <div className="comment-content">
                <span className="comment-author">{author}:</span>
                <span className="comment-text">{text}</span>
            </div>
            <div className="comment-actions">
                <span className="delete-comment-link" onClick={() => onDelete(commentId)}>
                    Delete
                </span>
            </div>
        </div>
    );
};

export default Comment;
