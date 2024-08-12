/* eslint-disable @next/next/no-img-element */

"use client";

import { ChatPanel } from "@/components/chat-panel";
import { Spinner } from "@/components/spinner";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const chatFunction = async (
    event: { preventDefault?: () => void } | undefined
  ): Promise<void> => {
    setLoading(true);
    await handleSubmit(event);
  };

  const render = async (latex: string) => {
    try {
      const response = await fetch("api/render", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latex_code: latex,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) return;

    const lastMessage = messages[messages.length - 1];

    if (lastMessage && lastMessage.role === "assistant") {
      render(lastMessage.content);
    }
  }, [messages, isLoading]);

  return (
    <>
      <div className="h-full container mx-auto flex items-center justify-center relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Spinner />
          </div>
        )}
        {image && (
          <img
            src={image}
            alt="Generated"
            className={cn("w-full h-full max-h-[50dvh]", {
              "opacity-50": loading,
            })}
          />
        )}
      </div>

      <ChatPanel
        handleSubmit={chatFunction}
        handleInputChange={handleInputChange}
        input={input}
      />
    </>
  );
}
