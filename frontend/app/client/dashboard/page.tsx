import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, DollarSign, Users } from "lucide-react"

export default function ClientDashboard() {
  // Mock data for jobs
  const activeJobs = [
    {
      id: 1,
      title: "Smart Contract Development",
      description: "Need a developer to create a custom ERC-20 token with specific functionality.",
      budget: "0.5 ETH",
      deadline: "7 days",
      applicants: 4,
      status: "active",
    },
    {
      id: 2,
      title: "DApp Frontend Design",
      description: "Looking for a UI/UX designer to create a modern interface for our DeFi application.",
      budget: "0.3 ETH",
      deadline: "5 days",
      applicants: 2,
      status: "active",
    },
  ]

  const completedJobs = [
    {
      id: 3,
      title: "Solidity Code Audit",
      description: "Need an experienced developer to audit our smart contract for security vulnerabilities.",
      budget: "0.4 ETH",
      deadline: "Completed",
      applicants: 3,
      status: "completed",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Jobs</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Post New Job
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Jobs</TabsTrigger>
          <TabsTrigger value="completed">Completed Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function JobCard({ job }: { job: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription className="mt-2">{job.description}</CardDescription>
          </div>
          <Badge variant={job.status === "active" ? "default" : "secondary"}>
            {job.status === "active" ? "Active" : "Completed"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center">
            <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{job.budget}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{job.deadline}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4 text-muted-foreground" />
            <span>{job.applicants} applicants</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">View Details</Button>
        <Button>View Applicants</Button>
      </CardFooter>
    </Card>
  )
}

import { PlusCircle } from "lucide-react"

