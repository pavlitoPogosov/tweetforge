import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect, useRef, useState } from "react";
import { CopyIcon } from "@/components/icons/CopyIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULT_INSTRUCTION, PERSONALITIES } from "./_data";
import { Skeleton } from "@/components/ui/skeleton";
import posthog from "posthog-js";

// Function to handle progress updates
const useProgressSteps = (
  loading: boolean,
  setProgress: (value: number) => void,
  setProgressText: (text: string) => void
) => {
  useEffect(() => {
    const timeoutIds: NodeJS.Timeout[] = [];

    if (loading) {
      // Set initial progress
      setProgress(10);
      setProgressText("Parsing the webpage...");

      const steps = [
        { progress: 25, text: "Collecting the information...", delay: 10000 },
        { progress: 50, text: "Writing tweets...", delay: 15000 },
        { progress: 75, text: "Final adjustments...", delay: 15000 },
        { progress: 100, text: "Done!", delay: 15000 },
      ];

      steps.forEach((step, index) => {
        timeoutIds.push(
          setTimeout(
            () => {
              setProgress(step.progress);
              setProgressText(step.text);
            },
            steps
              .slice(0, index + 1)
              .reduce((total, curr) => total + curr.delay, 0)
          )
        );
      });
    } else {
      timeoutIds.forEach((id) => clearTimeout(id));
    }

    return () => timeoutIds.forEach((id) => clearTimeout(id));
  }, [loading]);
};

export function TweetGenerator() {
  const [url, setUrl] = useState("");
  const [instructions, setInstructions] = useState(DEFAULT_INSTRUCTION);
  const [personality, setPersonality] = useState(PERSONALITIES[0].label);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState([] as { text: string }[]);
  const [progress, setProgress] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [progressText, setProgressText] = useState("Parsing the webpage...");
  const [isFormShown, setIsFormShown] = useState(true);

  // Refs for form and first tweet
  const formRef = useRef<HTMLFormElement>(null);
  const tweetsRef = useRef<HTMLDivElement>(null);

  // Custom hook to manage progress steps
  useProgressSteps(loading, setProgress, setProgressText);

  // Function to scroll to the form
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidHttpUrl(url)) {
      setError("Please enter a valid URL.");
      return;
    }
    setError("");
    setLoading(true);
    setTweets([]);

    scrollToForm();
    setIsFormShown(false);
    posthog.capture("generate_tweets", { url, personality });

    try {
      const response = await axios.post(
        "https://webhook.latenode.com/1194/prod/31c15231-66bf-47e9-a9e2-177154243a10",
        {
          url,
          instructions,
          personality:
            PERSONALITIES.find((x) => x.label === personality)?.prompt || "",
        }
      );

      if (Array.isArray(response.data)) {
        setTweets(response.data);
        setIsFormShown(false);
        posthog.capture("tweets_loaded", { tweets: response.data });
      } else {
        setIsFormShown(true);
        toast.error("Something went wrong! Please, try again");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error(
        "An error occurred while submitting the data. Please try again."
      );
      setIsFormShown(true);
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
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-4 bg-white rounded"
        ref={formRef} // Attach the form ref here
      >
        {isFormShown && (
          <>
            <h1 className="text-2xl sm:text-4xl text-center font-bold mb-1 md:mb-3 text-gray-900">
              Instantly Generate High-Quality Tweets From Any URL
            </h1>

            <p className="text-base sm:text-lg text-center text-gray-600 mb-2 md:mb-8">
              Give a URL to the content you like, add your suggestions, and get
              free, ready-to-post tweets.
            </p>

            <div className="mb-6">
              <label
                htmlFor="url"
                className="block text-gray-700 font-medium mb-1"
              >
                URL
              </label>
              <Input
                id="url"
                type="text"
                placeholder="Enter the URL (e.g., https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full mb-2 border border-gray-400 p-6 text-lg rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900"
              />
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
                placeholder="Enter additional instructions for tweet generation (e.g., focus on key statistics, keep it humorous)"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                style={{ minHeight: 100, resize: "none" }}
                className="w-full mb-2 border border-gray-400 p-6 text-lg rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900"
              />
              <p className="text-sm text-gray-500 mt-1">
                Add extra instructions to help create your tweets.
              </p>
            </div>

            <div className="mb-6">
              <label
                htmlFor="ton-of-voice"
                className="block text-gray-700 font-medium mb-1"
              >
                Tone of Voice
              </label>

              <Select onValueChange={setPersonality} value={personality}>
                <SelectTrigger
                  id="ton-of-voice"
                  className="w-full mb-2 border border-gray-400 p-6 text-lg rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900"
                >
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
                <SelectContent>
                  {PERSONALITIES.map((option) => (
                    <SelectItem
                      className="text-lg px-6 py-2"
                      key={option.id}
                      value={option.label}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <p className="text-sm text-gray-500 mt-1">
                Pick the tone for your tweets.
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mx-auto w-full bg-black text-white text-xl py-6 px-6 rounded-md hover:bg-gray-900"
            >
              {loading ? "Generating..." : "Generate Tweets"}
            </Button>
          </>
        )}

        {loading && (
          <div className="mt-12">
            <Progress value={progress} className="w-full" />
            <p className="text-2xl text-gray-500 mt-2">
              {`Making your tweets, please wait 1-2 minutes. `} {progressText}
            </p>
          </div>
        )}
      </form>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-7xl mx-auto p-4">
          {new Array(3).fill(1).map((_, index) => (
            <Skeleton key={index} className="w-full h-[156px]" />
          ))}
        </div>
      )}

      {!loading && !isFormShown && tweets.length > 0 && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto p-4"
          ref={tweetsRef} // Attach the tweets ref here
        >
          {tweets.map((tweet, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded shadow-md flex flex-col justify-between"
            >
              <p className="text-gray-800 mb-4">{tweet.text}</p>
              <CopyToClipboard
                text={tweet.text}
                onCopy={() => {
                  setCopiedIndex(index);
                  posthog.capture("tweet_copy", { text: tweet.text });
                }}
              >
                <Button className="mx-auto bg-black text-white text-md py-1 rounded-md hover:bg-gray-900 w-fit">
                  {copiedIndex === index ? "Copied!" : "Copy Text"}
                  <CopyIcon />
                </Button>
              </CopyToClipboard>
            </div>
          ))}
        </div>
      )}

      {!loading && !isFormShown && tweets.length > 0 && (
        <div className="flex justify-center mt-4">
          <Button
            className="bg-black text-white text-2xl p-8 rounded-md hover:bg-gray-900 w-fit"
            onClick={() => {
              setIsFormShown(true);
              scrollToForm();
            }}
          >
            Generate New Tweets
          </Button>
        </div>
      )}
    </div>
  );
}
