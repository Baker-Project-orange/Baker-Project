import React, { useState, useEffect } from "react";
import { UserCircle, Edit2, Trash2, MessageCircle } from "lucide-react";

const Comment = ({
  comment,
  currentUser,
  onEdit,
  onDelete,
  onReply,
  isChef,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleEdit = () => {
    onEdit(comment.id, editedContent);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center mb-2">
        <UserCircle className="w-8 h-8 text-gray-500 mr-2" />
        <span className="font-semibold">{comment.user.name}</span>
      </div>
      {isEditing ? (
        <div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 border rounded-md mb-2"
          />
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md"
          >
            Cancel
          </button>
        </div>
      ) : (
        <p className="text-gray-700 mb-2">{comment.content}</p>
      )}
      <div className="flex items-center text-sm text-gray-500">
        <span className="mr-4">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
        {currentUser && currentUser.id === comment.user.id && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="mr-2 flex items-center"
            >
              <Edit2 className="w-4 h-4 mr-1" /> Edit
            </button>
            <button
              onClick={() => onDelete(comment.id)}
              className="mr-2 flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-1" /> Delete
            </button>
          </>
        )}
        {isChef && (
          <button
            onClick={() => onReply(comment.id)}
            className="flex items-center"
          >
            <MessageCircle className="w-4 h-4 mr-1" /> Reply
          </button>
        )}
      </div>
    </div>
  );
};

const CommentsSection = ({ recipeId, currentUser, isChef }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch comments for the recipe
    // This is a placeholder, replace with actual API call
    const fetchComments = async () => {
      // const response = await fetch(`/api/comments/${recipeId}`);
      // const data = await response.json();
      // setComments(data);
      setComments([
        {
          id: 1,
          content: "Great recipe!",
          user: { id: 1, name: "John Doe" },
          createdAt: new Date(),
        },
        {
          id: 2,
          content: "I loved it!",
          user: { id: 2, name: "Jane Smith" },
          createdAt: new Date(),
        },
      ]);
    };

    fetchComments();
  }, [recipeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add new comment
    // This is a placeholder, replace with actual API call
    const newCommentObj = {
      id: comments.length + 1,
      content: newComment,
      user: { id: currentUser.id, name: currentUser.name },
      createdAt: new Date(),
    };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const handleEdit = async (commentId, newContent) => {
    // Edit comment
    // This is a placeholder, replace with actual API call
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, content: newContent } : comment
    );
    setComments(updatedComments);
  };

  const handleDelete = async (commentId) => {
    // Delete comment
    // This is a placeholder, replace with actual API call
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
  };

  const handleReply = async (commentId) => {
    // Implement reply functionality
    console.log("Reply to comment:", commentId);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      {currentUser && (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border rounded-md mb-2"
            required
          />
          <button
            type="submit"
            className="bg-[#c98d83] text-white px-4 py-2 rounded-md hover:bg-[#b67c73] transition-colors duration-300"
          >
            Post Comment
          </button>
        </form>
      )}
      <div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onReply={handleReply}
            isChef={isChef}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
