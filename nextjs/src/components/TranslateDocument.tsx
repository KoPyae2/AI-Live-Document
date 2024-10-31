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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { BotIcon, LanguagesIcon } from 'lucide-react';
import { toast } from 'sonner';
import Markdown from 'react-markdown'

type Language =
    | "english"
    | "spanish"
    | "portuguese"
    | "french"
    | "german"
    | "chinese"
    | "arabic"
    | "hindi"
    | "russian"
    | "japanese"
    | "burmese";

const languages: Language[] = [
    "english",
    "spanish",
    "portuguese",
    "french",
    "german",
    "chinese",
    "arabic",
    "hindi",
    "russian",
    "japanese",
    "burmese"
];

export default function TranslateDocument({ doc }: { doc: Y.Doc }) {
    const [isOpen, setIsOpen] = useState(false)
    const [language, setLanguage] = useState<string>()
    const [summary, setSummary] = useState<string>()
    const [isPending, startTransition] = useTransition()

    const handleAskQuestion = async (e: FormEvent) => {
        e.preventDefault()

        startTransition(async () => {
            const documentData = doc.get("document-store").toJSON();

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/translateDocumnet`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ document: documentData, targetLanguage: language }),
            })

            if (res.ok) {
                const { translated_text } = await res.json()
                setSummary(translated_text)
                toast.success("Document Translated Successfully!")
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant='outline'>
                <DialogTrigger>
                    <LanguagesIcon />
                    Translate
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Translate The Document!</DialogTitle>
                    <DialogDescription>
                        Select a Language and AI will summerize and translate the document in the selected language
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
                <div className='flex gap-2'>
                    <Select
                        value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    languages.map((lang) => (
                                        <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button onClick={handleAskQuestion} type="submit" disabled={!language || isPending}>
                        {isPending ? "Translating..." : "Translate"}
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}
