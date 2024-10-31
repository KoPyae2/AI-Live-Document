"use server"

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../firebase-admin";
import { liveblocks } from "@/lib/liveblock";

export async function createNewDocument() {
  auth.protect();
  const { sessionClaims } = await auth();
  const docCollectionRef = adminDb.collection('documents');
  console.log(docCollectionRef);
  
  const docRef = await docCollectionRef.add({
    title: 'New Document',
  })
  await adminDb.collection('users').doc(sessionClaims?.email!).collection('rooms').doc(docRef.id).set({
    userId: sessionClaims?.email,
    role: 'owner',
    createdAt: new Date(),
    roomId: docRef.id
  })
  return { docId: docRef.id }
}

export async function deleteDocument(roomId: string) {
  auth.protect()
  try {
    await adminDb.collection('documents').doc(roomId).delete() //delete roomId on server
    const query = await adminDb.collectionGroup('rooms').where('roomId', '==', roomId).get() //retrieve roomId attached to all users
    const batch = adminDb.batch()
    query.docs.forEach((doc) => { //delete in bulk all references to room aka document
      batch.delete(doc.ref)
    })
    await batch.commit() //execute command
    await liveblocks.deleteRoom(roomId) //delete room in liveblocks
    return { success: true }
  } catch (error) {
    console.log(error);
    return { success: false }
  }
}

export async function inviteUserToRoom(roomId: string, email: string) {
  auth.protect()
  console.log(roomId, email);
  try {
    await adminDb.collection('users').doc(email).collection('rooms').doc(roomId).set({
      userId: email,
      role: 'editor',
      createdAt: new Date(),
      roomId
    }) //attach room to user
    return { success: true }
  } catch (error) {
    console.log(error);
    return { success: false }
  }

}

export async function removeUserFromDocument(roomId: string, email: string) {
  auth.protect()
  try {
    await adminDb.collection('users').doc(email).collection('rooms').doc(roomId).delete()
    return { success: true }
  }
  catch (error) {
    console.log(error);
    return { success: false }
  }

}