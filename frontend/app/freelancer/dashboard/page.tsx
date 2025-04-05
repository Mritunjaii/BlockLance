import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, DollarSign, CheckCircle } from "lucide-react"

export default function FreelancerDashboard() {
  // Mock data for applications
  const pendingApplications = [
    {
      id: 1,
      jobTitle: "Smart Contract Development",
      clientName: "John Smith",
      description: "Need a developer to create a custom ERC-20 token with specific functionality.",
      budget: "0.5 ETH",
      proposedBudget: "0.45 ETH",
      deadline: "7 days",
      status: "pending",
      appliedDate: "2 days ago",
    },
    {
      id: 2,
      jobTitle: "NFT Marketplace Integration",
      clientName: "Emma Davis",
      description: "Looking for a developer to integrate our existing NFT collection with a marketplace.",
      budget: "0.6 ETH",
      proposedBudget: "0.6 ETH",
      deadline: "10 days",
      status: "pending",
      appliedDate: "1 day ago",
    },
  ]

  const activeJobs = [
    {
      id: 3,
      jobTitle: "DApp Frontend Design",
      clientName: "John Smith",
      description: "Looking for a UI/UX designer to create a modern interface for our DeFi application.",
      budget: "0.3 ETH",
      proposedBudget: "0.3 ETH",
      deadline: "5 days remaining",
      status: "active",
      progress: "50%",
      milestones: [
        { id: 1, title: "Wireframes", status: "completed" },
        { id: 2, title: "UI Design", status: "in-progress" },
        { id: 3, title: "Implementation", status: "pending" },
      ],
    },
  ]

  const completedJobs = [
    {
      id: 4,
      jobTitle: "Solidity Code Audit",
      clientName: "Sarah Williams",
      description: "Need an experienced developer to audit our smart contract for security vulnerabilities.",
      budget: "0.4 ETH",
      proposedBudget: "0.4 ETH",
      status: "completed",
      completedDate: "Last week",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Applications</h2>
        <Button>
          <Search className="mr-2 h-4 w-4" />
          Browse Jobs
        </Button>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Applications</TabsTrigger>
          <TabsTrigger value="active">Active Jobs</TabsTrigger>
          <TabsTrigger value="completed">Completed Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingApplications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {activeJobs.map((job) => (
            <ActiveJobCard key={job.id} job={job} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedJobs.map((job) => (
            <CompletedJobCard key={job.id} job={job} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ApplicationCard({ application }: { application: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{application.jobTitle}</CardTitle>
            <CardDescription className="mt-1">Client: {application.clientName}</CardDescription>
          </div>
          <Badge>Pending</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{application.description}</p>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center">
            <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>Budget: {application.budget}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>Your Proposal: {application.proposedBudget}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>Deadline: {application.deadline}</span>
          </div>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">Applied {application.appliedDate}</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Edit Proposal</Button>
        <Button variant="destructive">Withdraw</Button>
      </CardFooter>
    </Card>
  )
}

function ActiveJobCard({ job }: { job: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{job.jobTitle}</CardTitle>
            <CardDescription className="mt-1">Client: {job.clientName}</CardDescription>
          </div>
          <Badge variant="default">Active</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{job.description}</p>
        <div className="flex space-x-4 text-sm mb-4">
          <div className="flex items-center">
            <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>Budget: {job.budget}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{job.deadline}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Progress</span>
            <span>{job.progress}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: job.progress }}></div>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Milestones</h4>
          <div className="space-y-2">
            {job.milestones.map((milestone: any) => (
              <div key={milestone.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  {milestone.status === "completed" ? (
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  ) : milestone.status === "in-progress" ? (
                    <Clock className="mr-2 h-4 w-4 text-amber-500" />
                  ) : (
                    <Circle className="mr-2 h-4 w-4 text-muted-foreground" />
                  )}
                  <span>{milestone.title}</span>
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
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Message Client</Button>
        <Button>Submit Milestone</Button>
      </CardFooter>
    </Card>
  )
}

function CompletedJobCard({ job }: { job: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{job.jobTitle}</CardTitle>
            <CardDescription className="mt-1">Client: {job.clientName}</CardDescription>
          </div>
          <Badge variant="secondary">Completed</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{job.description}</p>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center">
            <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>Payment: {job.budget}</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
            <span>Completed {job.completedDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline">View Details</Button>
      </CardFooter>
    </Card>
  )
}

import { Search, Circle } from "lucide-react"

