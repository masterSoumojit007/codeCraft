import { CodeIcon, SendIcon } from "lucide-react";
import { useState } from "react";
import CommentContent from "./CommentContent";

interface CommentFormProps {
  onSubmit: (comment: string) => Promise<void>;
  isSubmitting: boolean;
}

function CommentForm({ isSubmitting, onSubmit }: CommentFormProps) {
  const [comment, setComment] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newComment =
        comment.substring(0, start) + "  " + comment.substring(end);
      setComment(newComment);
      e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) return;

    await onSubmit(comment);

    setComment("");
    setIsPreview(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 transition-all ease-in-out duration-300"
    >
      <div className="bg-[#2b2b36] rounded-xl shadow-xl overflow-hidden transition-all ease-in-out duration-500">
        {/* Comment form header */}
        <div className="flex justify-between items-center px-6 py-3 bg-[#3b3b4e] border-b border-[#ffffff0d] transition-all ease-in-out duration-300">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className={`text-sm px-4 py-2 rounded-md transition-all duration-300 ${
              isPreview
                ? "bg-blue-500/20 text-blue-400"
                : "hover:bg-[#ffffff08] text-gray-300"
            }`}
          >
            {isPreview ? "Edit Your Comment" : "Preview Your Comment"}
          </button>
        </div>

        {/* Comment form body */}
        {isPreview ? (
          <div className="min-h-[120px] p-4 text-[#e1e1e3]">
            <CommentContent content={comment} />
          </div>
        ) : (
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What’s your take on this? Share your thoughts..."
            className="w-full bg-transparent border-0 text-[#e1e1e3] placeholder:text-[#808086] outline-none resize-none min-h-[120px] p-4 font-mono text-sm rounded-lg transition-all duration-200 ease-in-out"
          />
        )}

        {/* Comment Form Footer */}
        <div className="flex items-center justify-between gap-4 px-6 py-3 bg-[#3b3b4e] border-t border-[#ffffff0d]">
          <div className="hidden sm:block text-xs text-[#808086] space-y-1">
            <div className="flex items-center gap-2">
              <CodeIcon className="w-4 h-4" />
              <span>
                Use triple backticks for code formatting (```language)
              </span>
            </div>
            <div className="text-[#808086]/60 pl-5">
              Press Tab to insert spaces • Preview your comment before posting
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !comment.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed transition-all ml-auto ease-in-out duration-300"
          >
            {isSubmitting ? (
              <>
                <div
                  className="w-4 h-4 border-2 border-white/30 
                border-t-white rounded-full animate-spin"
                />
                <span>Posting Your Comment...</span>
              </>
            ) : (
              <>
                <SendIcon className="w-5 h-5" />
                <span>Share Your Comment</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CommentForm;
