"use client";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { run } from "../lib/ai_actions";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState } from "react";

export default function AiSummary() {
  const [summaryText, setSummaryText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handlePress = async () => {
    setLoading(true);
    try {
      const response = await run();
      setSummaryText(response);
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 mt-6 border-2 rounded-xl">
      <CardHeader>
        <Button color="primary" onPress={handlePress}>Create AI generated saving plan</Button>
      </CardHeader>
      <CardBody>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{summaryText}</ReactMarkdown>
        )}
      </CardBody>
    </Card>
  );
}
