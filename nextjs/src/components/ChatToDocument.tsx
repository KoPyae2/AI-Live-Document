import React, { FormEvent, useEffect, useState, useTransition } from 'react'
import * as Y from 'yjs';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import { BotIcon } from 'lucide-react';
import { toast } from 'sonner';
import Markdown from 'react-markdown'
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import { Input } from './ui/input';


export default function ChatToDocument({ doc }: { doc: Y.Doc }) {
    const [isOpen, setIsOpen] = useState(false)
    const [summary, setSummary] = useState<string>()
    const [question, setQuestion] = useState<string>()
    const [isPending, startTransition] = useTransition()

    const handleAskQuestion = async (e: FormEvent) => {
        e.preventDefault()

        startTransition(async () => {
            const documentData = doc.get("document-store").toJSON();

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ document: documentData, question: question }),
            })

            if (res.ok) {
                const { response } = await res.json()
                setSummary(response)
                setQuestion('')
                toast.success("Document Translated Successfully!")
            }
        })
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant='outline'>
                <DialogTrigger>
                    <ChatBubbleIcon />
                    Chat to Document
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chat to the Document!</DialogTitle>
                    <DialogDescription>
                        Ask a question and chat to the document with AI.
                    </DialogDescription>
                </DialogHeader>
                {summary && (
                    <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
                        <div className="flex">
                            <BotIcon className="w-10 flex-shrink-0" />
                            <p className="font-bold">
                                GPT {isPending ? "is thinking..." : "Says:"}
                            </p>
                        </div>
                        <p>{isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}</p>
                    </div>
                )}
                <form onSubmit={handleAskQuestion} className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="i.e. what is this about?"
                        className="w-full"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <Button onClick={handleAskQuestion} type="submit" disabled={!question || isPending}>
                        {isPending ? "Asking..." : "Ask"}
                    </Button>
                </form>

            </DialogContent>
        </Dialog>
    )
}
