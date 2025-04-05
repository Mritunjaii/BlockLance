import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, User, Briefcase } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">BlockLance</CardTitle>
          <CardDescription>Decentralized freelancing platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <a href="#" className="text-slate-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="signup">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <input id="name" type="text" placeholder="Enter your name" className="w-full p-2 border rounded-md" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="signup-email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="signup-password" className="text-sm font-medium">
                    Password
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" id="terms" />
                  <label htmlFor="terms">
                    I agree to the{" "}
                    <a href="#" className="text-slate-600 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-slate-600 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="w-full grid grid-cols-2 gap-4">
            <Link href="/client/dashboard" className="w-full">
              <Button className="w-full flex items-center justify-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>As Client</span>
              </Button>
            </Link>
            <Link href="/freelancer/dashboard" className="w-full">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <User className="h-4 w-4" />
                <span>As Freelancer</span>
              </Button>
            </Link>
          </div>
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <Wallet className="h-4 w-4" />
            <span>Connect Wallet</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

