import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function ProVersion() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      await axios.post(
        "https://webhook.latenode.com/1194/prod/90c88543-8f80-4b56-9c45-b3bfaa995e79",
        { email }
      );
      toast.success("Thank you! We will notify you about early access.");
      setIsSubmitted(true);
      setError("");
    } catch (error) {
      console.error("Error submitting email:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="p-4">
      <h2
        id="pro-version"
        className="text-center text-4xl font-bold text-gray-900 mb-8"
      >
        Pro Version is Coming Soon!
      </h2>

      <Card className="max-w-sm mx-auto shadow-lg border border-gray-300">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <p className="text-4xl font-bold text-gray-900 mb-6">$19/month</p>
            <p className="text-lg text-gray-900 font-bold mb-3">
              Unlock more powerful features! Leave your email for early access.
            </p>
          </div>
          <ul className="text-left list-disc list-inside text-gray-800 mb-8">
            <li>Generate tweets from entire websites by domain</li>
            <Separator orientation="horizontal" />
            <li className="mt-2">
              Advanced tweet generation with customizable options
            </li>
            <Separator orientation="horizontal" />
            <li className="mt-2">
              Schedule and auto-post tweets with one click
            </li>
            <Separator orientation="horizontal" />
            <li className="mt-2">
              Teach the tool to match your brand’s style using your account,
              field, and previous tweets
            </li>
          </ul>
          <p className="text-center text-gray-800 mb-6">
            Leave your email for early free access. We&apos;ll only send you
            <span className="font-bold">{` one email`}</span> with the link when
            it&apos;s ready.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col items-center"
          >
            <div className="w-full max-w-lg">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitted}
                className="w-full mb-2 border border-gray-400 p-6 text-lg rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              {error && (
                <p className="text-red-600 mt-1 text-sm text-center">{error}</p>
              )}
            </div>

            {!isSubmitted && (
              <Button
                type="submit"
                className="mx-auto mt-2 w-full bg-black text-white text-xl py-6 px-6 rounded-md hover:bg-gray-900"
              >
                Stay Tuned
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
