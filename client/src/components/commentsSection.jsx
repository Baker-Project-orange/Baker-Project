import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, Reply, Send, Flag, X, AlertTriangle } from 'lucide-react';

const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [newReply, setNewReply] = useState('');
  const [reportingCommentId, setReportingCommentId] = useState(null);
  const [reportReason, setReportReason] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [user_id] = useState("66d97b52a2e9f029d88d9cce");
  const [chef_id] = useState("66d775724924397e1179e5eb");
  const [recipe_id] = useState("66d7e3a4e175ed517bc023d7");

  const [is_chef] = useState(true);

  const reportReasons = [
    'Inappropriate content',
    'Spam',
    'Offensive language',
    'Off-topic'
  ];

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/recipes/comments/${recipe_id}`, {
        params: { chef_id }
      });
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      showAlertMessage("Failed to load comments. Please refresh the page.");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [recipe_id, chef_id]);

  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage('');
      window.location.reload();
    }, 2000);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() !== '' && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await axios.post("http://localhost:3000/api/recipes/comments", {
          newComment,
          recipe_id,
          chef_id,
          user_id
        });
        setNewComment('');
        showAlertMessage("Comment added successfully.");
      } catch (error) {
        console.error("Error adding comment:", error);
        showAlertMessage("Failed to add comment. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReplySubmit = async (commentId) => {
    if (newReply.trim() !== '' && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await axios.post(`http://localhost:3000/api/recipes/comments/${commentId}/replies`, {
          newReply,
          chef_id
        });
        setNewReply('');
        setReplyingToCommentId(null);
        showAlertMessage("Reply added successfully.");
      } catch (error) {
        console.error("Error adding reply:", error);
        showAlertMessage("Failed to add reply. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReportSubmit = async (commentId) => {
    if (reportReason && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await axios.post(`http://localhost:3000/api/recipes/comments/${commentId}/report`, {
          reportReason,
          user_id
        });
        setReportingCommentId(null);
        setReportReason('');
        showAlertMessage("Comment reported successfully.");
      } catch (error) {
        console.error("Error reporting comment:", error);
        showAlertMessage("Failed to report comment. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="mt-6 bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-3 text-[#c98d83] flex items-center">
        <MessageSquare className="mr-2" size={20} /> Comments
      </h2>
      {alertMessage && (
        <div className="bg-[#f8e5e1] border-l-4 border-[#c98d83] text-[#c98d83] p-4 mb-4 relative animate-fade-in-down">
          <AlertTriangle size={18} className="inline-block mr-2" />
          <p className="inline">{alertMessage}</p>
        </div>
      )}
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
            disabled={isSubmitting}
            className={`bg-[#c98d83] text-white px-3 py-1 rounded-md hover:bg-[#b67c73] transition-colors text-sm flex items-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Send size={16} className="mr-1" /> Submit
          </button>
        </div>
        {comments.map(comment => (
          <div key={comment._id} className="bg-[#f8e5e1] rounded-lg p-2 relative">
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className="font-semibold text-sm">{comment.userRating}</span>
                <span className="text-gray-500 text-xs ml-2">commented:</span>
              </div>
              <button
                onClick={() => setReportingCommentId(comment._id === reportingCommentId ? null : comment._id)}
                className="text-gray-500 hover:text-red-500 transition-colors"
                title="Report comment"
              >
                <Flag size={16} />
              </button>
            </div>
            <p className="text-sm ml-6">{comment.ratingComment}</p>
            {reportingCommentId === comment._id && (
              <div className="absolute right-0 top-8 mt-2 mr-2 bg-white p-2 rounded-md border border-[#c98d83] shadow-lg w-48 z-10">
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full rounded-md border border-[#c98d83] px-2 py-1 text-xs mb-2"
                >
                  <option value="">Select a reason</option>
                  {reportReasons.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
                <button
                  onClick={() => handleReportSubmit(comment._id)}
                  disabled={isSubmitting}
                  className={`w-full bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 transition-colors text-xs ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Submit Report
                </button>
              </div>
            )}
            <div className="mt-2 space-y-2 ml-6">
              {comment.replies && comment.replies.map(reply => (
                <div key={reply._id} className="bg-white rounded-lg p-2 w-[97%] shadow-sm">
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
                    disabled={isSubmitting}
                    className={`bg-[#c98d83] text-white px-2 py-1 rounded-md hover:bg-[#b67c73] transition-colors text-xs flex items-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
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