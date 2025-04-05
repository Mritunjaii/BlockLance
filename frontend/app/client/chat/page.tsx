"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"

// Mock data for chats
const chatData = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Freelancer",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I've completed the first milestone of the smart contract.",
    time: "10:30 AM",
    unread: 2,
    job: "Smart Contract Development",
    messages: [
      {
        id: 1,
        sender: "Alex Johnson",
        content: "Hi there! I'm interested in your Smart Contract Development job.",
        time: "Yesterday, 2:30 PM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        content: "Hello Alex! Thanks for your interest. Can you tell me more about your experience with Solidity?",
        time: "Yesterday, 3:15 PM",
        isOwn: true,
      },
      {
        id: 3,
        sender: "Alex Johnson",
        content:
          "I've been working with Solidity for 3 years now. I've developed several DeFi protocols and NFT marketplaces.",
        time: "Yesterday, 3:30 PM",
        isOwn: false,
      },
      {
        id: 4,
        sender: "You",
        content: "That sounds great! What's your approach to security in smart contracts?",
        time: "Yesterday, 4:00 PM",
        isOwn: true,
      },
      {
        id: 5,
        sender: "Alex Johnson",
        content:
          "I follow all the best practices for security. I always use the latest version of OpenZeppelin contracts and perform thorough testing.",
        time: "Yesterday, 4:15 PM",
        isOwn: false,
      },
      {
        id: 6,
        sender: "Alex Johnson",
        content:
          "I've completed the first milestone of the smart contract. You can check it out in the repository I shared.",
        time: "Today, 10:30 AM",
        isOwn: false,
      },
    ],
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Freelancer",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I'd like to discuss the UI design requirements.",
    time: "Yesterday",
    unread: 0,
    job: "DApp Frontend Design",
    messages: [
      {
        id: 1,
        sender: "Sarah Williams",
        content: "Hello! I saw your job posting for DApp Frontend Design and I'm very interested.",
        time: "2 days ago, 11:20 AM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        content: "Hi Sarah! Thanks for reaching out. Do you have experience with Web3 UI design?",
        time: "2 days ago, 12:05 PM",
        isOwn: true,
      },
      {
        id: 3,
        sender: "Sarah Williams",
        content:
          "Yes, I've designed several DApp interfaces. I'd like to discuss the UI design requirements in more detail.",
        time: "Yesterday, 9:30 AM",
        isOwn: false,
      },
    ],
  },
]

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState(chatData[0])
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (message.trim() === "") return

    // In a real app, you would send this to your API
    console.log("Sending message:", message)

    // Clear the input
    setMessage("")
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Chat list sidebar */}
      <div className="w-80 border-r overflow-y-auto">
        <div className="p-4">
          <h2 className="font-semibold mb-4">Messages</h2>
          <div className="space-y-2">
            {chatData.map((chat) => (
              <div
                key={chat.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  activeChat.id === chat.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
                onClick={() => setActiveChat(chat)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={chat.avatar} alt={chat.name} />
                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-start">
                      <div className="font-medium">{chat.name}</div>
                      <div className="text-xs">{chat.time}</div>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{chat.job}</div>
                    <div className="text-sm truncate">{chat.lastMessage}</div>
                  </div>
                  {chat.unread > 0 && (
                    <div className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={activeChat.avatar} alt={activeChat.name} />
              <AvatarFallback>{activeChat.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{activeChat.name}</div>
              <div className="text-sm text-muted-foreground">
                {activeChat.role} • {activeChat.job}
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeChat.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.isOwn ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <div className="text-sm">{msg.content}</div>
                <div className="text-xs mt-1 opacity-70">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Message input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
            />
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

