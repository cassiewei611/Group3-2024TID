import React, { useState } from 'react';
import Comment from './Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import './CommentsSection.css';

const CommentsSection = () => {
    const [comments, setComments] = useState([
        { commentId: 1, author: "Jakob_Miller", text: "Feel free to ask me questions!" },
        { commentId: 2, author: "Emily_Hartman", text: "Is there a specific age or breed requirement for the dogs?" },
        { commentId: 3, author: "Jakob_Miller", text: "Nope, all breeds and ages are welcome to participate!" }
    ]);
    const [newComment, setNewComment] = useState("");

    // Function to handle sending a new comment
    const handleSend = () => {
        if (newComment.trim()) {
            const newCommentObj = {
                commentId: comments.length + 1,
                author: "Current_User",
                text: newComment
            };
            setComments([...comments, newCommentObj]);
            setNewComment("");
        }
    };

    // Function to handle deleting a comment
    const handleDelete = (commentId) => {
        const confirmed = window.confirm("Are you sure you want to delete this comment?");
        if (confirmed) {
            setComments(comments.filter(comment => comment.commentId !== commentId));
        }
    };

    return (
        <div className="comments-section">
            {/* Mapping through comments */}
            {comments.map(comment => (
                <div key={comment.commentId} className="comment">
                    <div className="comment-content">
                        <span className="comment-author">{comment.author}:</span>
                        <span className="comment-text">{comment.text}</span>
                    </div>
                    <div className="comment-actions">
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="delete-icon"
                            onClick={() => handleDelete(comment.commentId)}
                        />
                    </div>
                </div>
            ))}

            {/* Comment Input */}
            <div className="comment-input">
                <input
                    type="text"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Button
                    onClick={handleSend}
                    label="Send"
                    className="send-button"
                />
            </div>
        </div>
    );
};

export default CommentsSection;
