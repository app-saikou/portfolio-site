"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TwitterIcon } from "@/components/TwitterIcon";
import { NoteIcon } from "@/components/NoteIcon";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  return (
    <div className="flex space-x-3">
      <Button
        variant="outline"
        onClick={() => {
          const currentUrl = url || window.location.href;
          const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            currentUrl
          )}&text=${encodeURIComponent(title)}`;
          window.open(shareUrl, "_blank");
        }}
        className="hover:bg-blue-50 hover:border-blue-200"
      >
        <TwitterIcon size={16} className="mr-2" />X
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          const currentUrl = url || window.location.href;
          const shareUrl = `https://note.com/intent/post?url=${encodeURIComponent(
            currentUrl
          )}&title=${encodeURIComponent(title)}`;
          window.open(shareUrl, "_blank");
        }}
        className="hover:bg-green-50 hover:border-green-200"
      >
        <NoteIcon size={16} className="mr-2" />
      </Button>
    </div>
  );
}
