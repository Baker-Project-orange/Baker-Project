
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, Reply, Send } from 'lucide-react';

const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [newReply, setNewReply] = useState('');

  const [user_id, set_user_id] = useState("66d7650f59e2ec4008259c89");
  const [chef_id, set_chef_id] = useState("66d775724924397e1179e5eb");
  const [recipe_id, set_recipe_id] = useState("66d7e3a4e175ed517bc023d7");

  const [is_chef, set_is_chef] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/recipes/comments/${recipe_id}`, {
          params: { chef_id }
        });
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [recipe_id, chef_id]);

  const handleCommentSubmit = async () => {
    if (newComment.trim() !== '') {
      try {
        const response = await axios.post("http://localhost:3000/api/recipes/comments", {
          newComment,
          recipe_id,
          chef_id,
          user_id
        });
        setComments(prevComments => [response.data, ...prevComments]);
        setNewComment('');
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleReplySubmit = async (commentId) => {
    if (newReply.trim() !== '') {
      try {
        const response = await axios.post(`http://localhost:3000/api/recipes/comments/${commentId}/replies`, {
          newReply,
          chef_id
        });
        setComments(prevComments =>
          prevComments.map(comment =>
            comment._id === commentId
              ? { ...comment, replies: [...(comment.replies || []), response.data] }
              : comment
          )
        );
        setNewReply('');
        setReplyingToCommentId(null);
      } catch (error) {
        console.error("Error adding reply:", error);
      }
    }
  };

  return (
    <div className="mt-6 bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-3 text-[#c98d83] flex items-center">
        <MessageSquare className="mr-2" size={20} /> Comments
      </h2>
      <div className="space-y-3">
        <div className="flex items-center space-x-2 mb-3">
          <input
            type="text"
            placeholder="Add a new comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 rounded-md border border-[#c98d83] px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-[#c98d83] focus:ring-opacity-50"
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-[#c98d83] text-white px-3 py-1 rounded-md hover:bg-[#b67c73] transition-colors text-sm flex items-center"
          >
            <Send size={16} className="mr-1" /> Submit
          </button>
        </div>
        {comments.map(comment => (
          <div key={comment._id} className="bg-[#f8e5e1] rounded-lg p-2">
            <div className="flex items-center mb-1">
              <span className="font-semibold text-sm">{comment.userRating}</span>
              <span className="text-gray-500 text-xs ml-2">commented:</span>
            </div>
            <p className="text-sm ml-6">{comment.ratingComment}</p>
            <div className="mt-2 space-y-2 ml-6">
              {comment.replies && comment.replies.map(reply => (
                <div key={reply._id} className="bg-white rounded-lg p-2 w-[97%]">
                  <div className="flex items-center mb-1">
                    <span className="font-semibold text-xs"><span className='text-[#c28378] font-bold'> Chef </span> {reply.replyAuthor}</span>
                    <span className="text-gray-500 text-xs ml-2">replied:</span>
                  </div>
                  <p className="text-xs ml-4">{reply.replyMessage}</p>
                </div>
              ))}
              {replyingToCommentId === comment._id ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Add a reply..."
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    className="flex-1 rounded-md border border-[#c98d83] px-2 py-1 focus:outline-none focus:ring focus:ring-[#c98d83] focus:ring-opacity-50 text-xs"
                  />
                  <button
                    onClick={() => handleReplySubmit(comment._id)}
                    className="bg-[#c98d83] text-white px-2 py-1 rounded-md hover:bg-[#b67c73] transition-colors text-xs flex items-center"
                  >
                    <Send size={12} className="mr-1" /> Send
                  </button>
                </div>
              ) : (
                is_chef && (
                  <button
                    onClick={() => setReplyingToCommentId(comment._id)}
                    className="bg-[#c98d83] text-white px-2 py-1 rounded-md hover:bg-[#b67c73] transition-colors mt-1 text-xs flex items-center"
                  >
                    <Reply size={12} className="mr-1" /> Reply
                  </button>
                )
              )}
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};


export default CommentsSection;

