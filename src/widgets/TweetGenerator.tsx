import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect, useState } from "react";

const DEFAULT_INSTRUCTION = `Don't use emojis \nDon't use hashtags`;

export function TweetGenerator() {
  const [url, setUrl] = useState("");
  const [instructions, setInstructions] = useState(DEFAULT_INSTRUCTION);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState([] as { text: string }[]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 1 : prev));
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidHttpUrl(url)) {
      setError("Please enter a valid URL.");
      return;
    }
    setError("");
    setLoading(true);
    setTweets([]);

    try {
      const response = await axios.post(
        "https://webhook.latenode.com/1194/prod/31c15231-66bf-47e9-a9e2-177154243a10",
        {
          url,
          instructions,
        }
      );
      setTweets(response.data.tweets);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error(
        "An error occurred while submitting the data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const isValidHttpUrl = (string: string) => {
    let url;
    try {
      url = new URL(string);
    } catch {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded mt-8">
        <h1 className="text-2xl font-bold mb-3 text-gray-800">
          Generate Tweets from URL with TweetForge
        </h1>
        <p className="text-gray-600 mb-5">
          Enter a URL and provide additional instructions to generate tweets and
          content.
        </p>
        <div className="mb-6">
          <label htmlFor="url" className="block text-gray-700 font-medium mb-1">
            Page URL
          </label>
          <Input
            id="url"
            type="text"
            placeholder="Enter the URL (e.g., https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-1">
            Enter the URL of the web page you want to generate tweets from.
          </p>
          {error && <p className="text-red-600 mt-1 text-sm">{error}</p>}
        </div>
        <div className="mb-6">
          <label
            htmlFor="instructions"
            className="block text-gray-700 font-medium mb-1"
          >
            Additional Instructions
          </label>
          <Textarea
            id="instructions"
            placeholder="Enter additional instructions for content generation (e.g., focus on key statistics, keep it humorous)"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full"
            style={{ minHeight: 100 }}
          />
          <p className="text-sm text-gray-500 mt-1">
            Add additional instructions to the AI assistant who will be
            responsible for generating your tweets.
          </p>
        </div>
        <Button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Content"}
        </Button>
        {loading && (
          <div className="mt-4">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-gray-500 mt-2">
              Generating tweets... This usually takes around 1-3 minutes.
            </p>
          </div>
        )}
      </form>

      {!loading && tweets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-7xl mx-auto p-4">
          {tweets.map((tweet, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded shadow-md flex flex-col justify-between"
            >
              <p className="text-gray-800 mb-4">{tweet.text}</p>
              <CopyToClipboard text={tweet.text}>
                <Button className="bg-black text-white py-2 rounded-md hover:bg-gray-900">
                  Copy Text
                </Button>
              </CopyToClipboard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
