"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, Plus, ArrowLeft } from "lucide-react";

interface TextFragment {
  id: number;
  text: string;
}

export default function Home() {
  const [fragments, setFragments] = useState<TextFragment[]>([]);
  const [newText, setNewText] = useState<string>("");
  const [selectedFragment, setSelectedFragment] = useState<TextFragment | null>(
    null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newText.trim()) {
      setFragments([
        ...fragments,
        {
          id: Date.now(),
          text: newText.trim(),
        },
      ]);
      setNewText("");
    }
  };

  const ListView: React.FC = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Text Fragments</CardTitle>
        <form onSubmit={handleSubmit} className="flex-1 ml-4">
          <div className="flex gap-2">
            <Textarea
              value={newText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setNewText(e.target.value)
              }
              placeholder="Enter your text here..."
              className="min-h-[60px]"
            />
            <Button type="submit" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full pr-4">
          {fragments.length === 0 ? (
            <p className="text-center text-gray-500">
              No text fragments yet. Add one above!
            </p>
          ) : (
            <div className="space-y-2">
              {fragments.map((fragment: TextFragment) => (
                <div
                  key={fragment.id}
                  onClick={() => setSelectedFragment(fragment)}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <p className="flex-1 truncate">
                    {fragment.text.slice(0, 100)}
                    {fragment.text.length > 100 && "..."}
                  </p>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );

  const DetailView: React.FC = () => {
    if (!selectedFragment) return null;

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedFragment(null)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>Text Fragment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg border border-gray-200">
            <p className="whitespace-pre-wrap">{selectedFragment.text}</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-4">
      {selectedFragment ? <DetailView /> : <ListView />}
    </div>
  );
}
