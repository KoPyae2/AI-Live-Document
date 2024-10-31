"use client"


import React from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation";
import { createNewDocument } from "../../actions/actions";

function NewDocumentButton() {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter()
  const handleCreateNewDocument = () => {
    startTransition(async () => {
      //create new document
      const { docId } = await createNewDocument()
      router.push(`/document/${docId}`)
    })

  }
  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending}>{isPending ? "Creating..." : "New Document"}</Button>
  )
}

export default NewDocumentButton