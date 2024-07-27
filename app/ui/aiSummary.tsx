"use client";
import { Button} from "@nextui-org/react";
import { run } from "../lib/ai_actions";


export default function AiSummary() {
    
  async function handlePress(){
    const summaryElement = document.getElementById("summary");
    if (summaryElement) {
      summaryElement.innerHTML = "Loading...";
    }
    let summary:string = await run();

    if (summaryElement) {
      summaryElement.innerHTML = summary;
    }
  }
  return (
    <>
    <Button color="primary" onPress={handlePress}>Get AI generated summary</Button>
      <div id="summary"></div>
    </>
  );
}
