import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ProVersion() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    try {
      await axios.post(
        "https://webhook.latenode.com/1194/prod/90c88543-8f80-4b56-9c45-b3bfaa995e79",
        { email }
      );
      setMessage("Thank you! We will notify you about early access.");
      setEmail("");
    } catch (error) {
      console.error("Error submitting email:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="mt-16 px-4">
      <h2 className="text-center text-4xl font-bold text-gray-900 mb-12">
        Pro Version is Coming Soon!
      </h2>

      <Card className="shadow-2xl border-2 border-gray-300">
        <CardContent className="p-12">
          <div className="text-center mb-8">
            <p className="text-6xl font-black text-purple-700 mb-6">
              $19/month
            </p>
            <p className="text-xl text-gray-700 mb-8">
              Unlock powerful features to take your content generation to the
              next level!
            </p>
          </div>
          <ul className="text-left list-disc list-inside text-gray-800 mb-10">
            <li className="mb-4">Parse entire domains</li>
            <li className="mb-4">Advanced text generating</li>
            <li className="mb-4">Auto-poste</li>
            <li className="mb-4">Customize and Teach AI to match your brand</li>
          </ul>
          <p className="text-center text-gray-800 mb-10 text-lg">
            Sign up now to get early access to the Pro Version!
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col items-center"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-6 max-w-lg border border-gray-400 p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <Button
              type="submit"
              className="bg-black text-white py-4 px-10 rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-xl"
            >
              Get Early Access
            </Button>
          </form>
          {message && (
            <p className="text-green-700 mt-8 text-center font-semibold text-lg">
              {message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
