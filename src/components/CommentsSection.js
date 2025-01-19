import React, { useEffect, useState } from 'react';
import Button from './Button';
import Comment from './Comment';
import { fetchComments, saveComment, handleDelete } from '../services/Parse';
import './CommentsSection.css';

const CommentsSection = ({ eventId, userId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const loadComments = async () => {
            const loadedComments = await fetchComments(eventId);
            setComments(
                loadedComments.map(comment => ({
                    ...comment,
                    isAuthor: comment.userId === userId,
                }))
            );
        };
        loadComments();
    }, [eventId, userId]);

    const handleSend = async () => {
        if (newComment.trim()) {
            const newCommentObj = await saveComment(eventId, userId, newComment);
            if (newCommentObj) {
                setComments([
                    ...comments,
                    {
                        ...newCommentObj,
                        isAuthor: true,
                    },
                ]);
                setNewComment("");
            }
        }
    };

    const handleCommentDelete = async (commentId) => {
        const success = await handleDelete(commentId, userId);
        if (success) {
            setComments(comments.filter(comment => comment.commentId !== commentId));
        }
    };

    return (
        <div className="comments-section">
            {comments.map(comment => (
                <Comment
                    key={comment.commentId}
                    commentId={comment.commentId}
                    author={comment.author}
                    text={comment.content}
                    onDelete={handleCommentDelete}
                    isAuthor={comment.isAuthor}
                />
            ))}
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

