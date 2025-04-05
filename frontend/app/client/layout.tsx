import type React from "react"
import { Briefcase, MessageSquare, PlusCircle, User } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"

const navItems = [
  {
    title: "Post Job",
    href: "/client/post-job",
    icon: <PlusCircle className="h-4 w-4" />,
  },
  {
    title: "My Jobs",
    href: "/client/dashboard",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    title: "Chat",
    href: "/client/chat",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    title: "Profile",
    href: "/client/profile",
    icon: <User className="h-4 w-4" />,
  },
]

const user = {
  name: "John Smith",
  email: "john@example.com",
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="font-bold text-xl mr-6">BlockLance</div>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav user={user} />
          </div>
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="w-64 border-r bg-slate-50 p-4">
          <MainNav items={navItems} userType="client" />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

