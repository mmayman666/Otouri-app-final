"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { checkAndConsumeCredits } from "../subscription/actions"

export interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  created_at: string
}

export interface ChatConversation {
  id: string
  title: string
  created_at: string
  updated_at: string
  message_count: number
  last_message: string
}

export async function createConversation(title: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("المستخدم غير مسجل الدخول")
  }

  const { data, error } = await supabase
    .from("chat_conversations")
    .insert({
      user_id: user.id,
      title: title,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating conversation:", error)
    throw new Error("فشل في إنشاء المحادثة")
  }

  revalidatePath("/dashboard/ai-chat")
  return data
}

export async function saveMessage(conversationId: string, role: "user" | "assistant", content: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("المستخدم غير مسجل الدخول")
  }

  const { error } = await supabase.from("chat_messages").insert({
    conversation_id: conversationId,
    role: role,
    content: content,
  })

  if (error) {
    console.error("Error saving message:", error)
    throw new Error("فشل في حفظ الرسالة")
  }

  revalidatePath("/dashboard/ai-chat")
}

export async function getConversations(): Promise<ChatConversation[]> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from("chat_conversations")
    .select(`
      id,
      title,
      created_at,
      updated_at,
      chat_messages (
        content,
        created_at
      )
    `)
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })

  if (error) {
    console.error("Error fetching conversations:", error)
    return []
  }

  return data.map((conv) => ({
    id: conv.id,
    title: conv.title,
    created_at: conv.created_at,
    updated_at: conv.updated_at,
    message_count: conv.chat_messages?.length || 0,
    last_message: conv.chat_messages?.[conv.chat_messages.length - 1]?.content?.slice(0, 50) + "..." || "لا توجد رسائل",
  }))
}

export async function getConversationMessages(conversationId: string): Promise<ChatMessage[]> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching messages:", error)
    return []
  }

  return data
}

export async function deleteConversation(conversationId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("المستخدم غير مسجل الدخول")
  }

  const { error } = await supabase.from("chat_conversations").delete().eq("id", conversationId).eq("user_id", user.id)

  if (error) {
    console.error("Error deleting conversation:", error)
    throw new Error("فشل في حذف المحادثة")
  }

  revalidatePath("/dashboard/ai-chat")
}

export async function updateConversationTitle(conversationId: string, title: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("المستخدم غير مسجل الدخول")
  }

  const { error } = await supabase
    .from("chat_conversations")
    .update({ title })
    .eq("id", conversationId)
    .eq("user_id", user.id)

  if (error) {
    console.error("Error updating conversation title:", error)
    throw new Error("فشل في تحديث عنوان المحادثة")
  }

  revalidatePath("/dashboard/ai-chat")
}

export { checkAndConsumeCredits }
