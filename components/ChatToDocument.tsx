"use client";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { deleteDocument, inviteUserToDocument } from "@/actions/actions";
import * as Y from 'yjs';
import { BotIcon, MessageCircleCode } from "lucide-react";

function ChatToDocument({doc}:{doc:Y.Doc}) {

    const [isOpen,setIsOpen] = useState(false);
    const [summary,setSummary] = useState<string>("");
    const [question,setQuestion] = useState<string>("");
    const [isPending,startTransition] = useTransition();
    const [input,setInput]=useState("");
    

    const handleAskQuestion = async (e:FormEvent)=>{
        
         e.preventDefault();

    setSummary(""); // reset
    setInput(input);

    startTransition(async () => {
      try {
        // get the document data
        const documentData = doc.get("document-store").toJSON();

        // send to backend
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              documentData,
              question: input,
            }),
          }
        );

        if (res.ok) {
          const { message } = await res.json();

          setInput(""); // clear input box
          setSummary(message); // show GPT answer
          toast.success("Question asked successfully!");
        } else {
          toast.error("Failed to get response from server!");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
      }
    });
    }


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="outline">
            <DialogTrigger>
                <MessageCircleCode className="mr-2"/>
                Chat To Document
            </DialogTrigger>
        </Button>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Chat to the Document !</DialogTitle>
      <DialogDescription>
       Ask a question and chat with AI.
      </DialogDescription>
    
    <hr className="mt-5" />
{question && <p className="mt-5 text-gray-500">Q: {question}</p>}

    </DialogHeader>

    {
        summary && (
      <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
        <div className="flex">
          <BotIcon className="w-10 flex-shrink-0" />
          <p className="font-bold">
            GPT {isPending ? "is thinking..." : "says:"}
          </p>
        </div>

        <div className="w-full text-left">
          {isPending ? (
            <p>Thinking...</p>
          ) : (
            <ReactMarkdown>{summary}</ReactMarkdown>
          )}
        </div>
      </div>
    )
    }
    
    <form className="flex gap-2" onSubmit={handleAskQuestion}>
  <Input
    type="text"
    placeholder="what is this about ?"
    className="w-full"
    value={input}
    onChange={(e) => setInput(e.target.value)}
  />
  <Button type="submit" disabled={!input || isPending}>
    {isPending ? "Asking…" : "Ask"}
  </Button>
</form>


  </DialogContent>
</Dialog>
  )
}

export default ChatToDocument