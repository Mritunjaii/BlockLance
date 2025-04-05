import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, DollarSign, FileText, Lock, Shield, Unlock } from "lucide-react"

export default function ContractPage({ params }: { params: { id: string } }) {
  // Mock data for contract
  const contract = {
    id: params.id,
    jobTitle: "Smart Contract Development",
    client: "John Smith",
    freelancer: "Alex Johnson",
    description: "Development of a custom ERC-20 token with specific functionality.",
    budget: "0.5 ETH",
    escrowAmount: "0.5 ETH",
    status: "in-progress",
    startDate: "May 15, 2023",
    deadline: "May 22, 2023",
    milestones: [
      {
        id: 1,
        title: "Initial Setup and Token Structure",
        description: "Set up the project and implement basic token structure.",
        amount: "0.15 ETH",
        status: "completed",
        completedDate: "May 17, 2023",
      },
      {
        id: 2,
        title: "Implement Token Features",
        description: "Add custom features like vesting, burning, and minting capabilities.",
        amount: "0.2 ETH",
        status: "in-progress",
        dueDate: "May 20, 2023",
      },
      {
        id: 3,
        title: "Testing and Deployment",
        description: "Comprehensive testing and deployment to mainnet.",
        amount: "0.15 ETH",
        status: "pending",
        dueDate: "May 22, 2023",
      },
    ],
    contractAddress: "0x1234...5678",
    transactions: [
      {
        id: 1,
        type: "Escrow Deposit",
        amount: "0.5 ETH",
        date: "May 15, 2023",
        txHash: "0xabcd...efgh",
      },
      {
        id: 2,
        type: "Milestone Payment",
        amount: "0.15 ETH",
        date: "May 17, 2023",
        txHash: "0xijkl...mnop",
      },
    ],
  }

  // Calculate progress
  const completedMilestones = contract.milestones.filter((m) => m.status === "completed").length
  const totalMilestones = contract.milestones.length
  const progressPercentage = Math.round((completedMilestones / totalMilestones) * 100)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main contract details */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{contract.jobTitle}</h1>
            <Badge
              variant={
                contract.status === "completed"
                  ? "outline"
                  : contract.status === "in-progress"
                    ? "default"
                    : "secondary"
              }
            >
              {contract.status === "completed"
                ? "Completed"
                : contract.status === "in-progress"
                  ? "In Progress"
                  : "Pending"}
            </Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contract Details</CardTitle>
              <CardDescription>Smart contract agreement between client and freelancer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Client</p>
                  <p className="font-medium">{contract.client}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Freelancer</p>
                  <p className="font-medium">{contract.freelancer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">{contract.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Deadline</p>
                  <p className="font-medium">{contract.deadline}</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="mt-1">{contract.description}</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Progress</p>
                  <p className="text-sm">{progressPercentage}%</p>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Escrow Amount</p>
                    <p className="text-sm">{contract.escrowAmount}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Contract Address</p>
                    <p className="text-sm font-mono">{contract.contractAddress}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Milestones</CardTitle>
              <CardDescription>Project deliverables and payment schedule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {contract.milestones.map((milestone, index) => (
                <div key={milestone.id} className="space-y-2">
                  {index > 0 && <Separator />}
                  <div className="pt-2 flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center">
                        {milestone.status === "completed" ? (
                          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                        ) : milestone.status === "in-progress" ? (
                          <Clock className="h-5 w-5 mr-2 text-amber-500" />
                        ) : (
                          <Lock className="h-5 w-5 mr-2 text-muted-foreground" />
                        )}
                        <h3 className="font-medium">{milestone.title}</h3>
                      </div>
                      <p className="text-sm mt-1">{milestone.description}</p>
                      <div className="flex items-center mt-2 text-sm">
                        <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{milestone.amount}</span>
                        {milestone.status === "completed" ? (
                          <span className="ml-4 text-green-600">Completed on {milestone.completedDate}</span>
                        ) : (
                          <span className="ml-4 text-muted-foreground">Due by {milestone.dueDate}</span>
                        )}
                      </div>
                    </div>
                    <Badge
                      variant={
                        milestone.status === "completed"
                          ? "outline"
                          : milestone.status === "in-progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {milestone.status === "completed"
                        ? "Completed"
                        : milestone.status === "in-progress"
                          ? "In Progress"
                          : "Pending"}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              {contract.status === "in-progress" && (
                <Button className="w-full">
                  <Unlock className="mr-2 h-4 w-4" />
                  Release Payment for Current Milestone
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        {/* Sidebar with transactions */}
        <div className="w-full md:w-80 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Blockchain transactions for this contract</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {contract.transactions.map((tx, index) => (
                <div key={tx.id} className="space-y-2">
                  {index > 0 && <Separator />}
                  <div className="pt-2">
                    <div className="flex justify-between">
                      <p className="font-medium">{tx.type}</p>
                      <p className="font-medium">{tx.amount}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{tx.date}</p>
                    <p className="text-xs font-mono truncate mt-1">{tx.txHash}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Transactions
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contract Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                View Contract Code
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Message Counterparty
              </Button>
              {contract.status === "in-progress" && (
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Raise Dispute
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

import { AlertTriangle, MessageSquare } from "lucide-react"

