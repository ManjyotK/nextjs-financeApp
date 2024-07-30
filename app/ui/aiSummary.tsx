"use client";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { run } from "../lib/ai_actions";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState } from "react";

/**
 * Component for generating and displaying an AI-generated saving plan summary.
 *
 * This component displays a card with a button to generate the saving plan.
 * When the button is pressed, it calls the `run` function in `../lib/ai_actions`
 * to generate a saving plan and displays the summary in the card body.
 *
 * @returns {JSX.Element} The AI summary component.
 */
export default function AiSummary() {
  // State variables for the summary text and loading state
  const [summaryText, setSummaryText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Handles the press event of the generate button.
   *
   * Calls the `run` function in `../lib/ai_actions` to generate a saving plan.
   * Sets the loading state to true while the saving plan is being generated
   * and sets the summary text state to the response from the `run` function.
   * If there is an error fetching the summary, it logs the error to the console.
   * Finally, sets the loading state to false.
   *
   * @returns {Promise<void>} A promise that resolves when the saving plan is generated.
   */
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
      {/* Card header with a generate button */}
      <CardHeader>
        <Button color="primary" onPress={handlePress}>Create AI generated saving plan</Button>
      </CardHeader>
      {/* Card body that displays the summary text or a loading message */}
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
