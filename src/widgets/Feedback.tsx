import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback) {
      toast.error("Please enter your feedback.");
      return;
    }
    try {
      await axios.post(
        "https://webhook.latenode.com/1194/prod/a66d8160-1041-4264-a568-f201c6a65e6d",
        {
          feedback,
        }
      );
      toast.success("Thank you for your feedback!");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="p-4">
      <h2
        id="leave-opinion"
        className="text-center text-4xl font-bold text-gray-900 mb-8"
      >
        Leave Your Opinion!
      </h2>
      <div className="rounded-lg max-w-lg mx-auto ">
        <form
          onSubmit={handleFeedbackSubmit}
          className="flex flex-col items-center"
        >
          <Textarea
            placeholder="What Do You Think?"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={isSubmitted}
            className="w-full mb-2 border border-gray-400 p-6 text-lg rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            style={{ minHeight: 100, resize: "none" }}
          />
          {!isSubmitted && (
            <Button
              type="submit"
              className="mx-auto mt-4 w-full bg-black text-white text-xl py-6 px-6 rounded-md hover:bg-gray-900"
            >
              Send
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
