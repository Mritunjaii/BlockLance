"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, DollarSign, Filter, Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// Mock data for jobs
const jobsData = [
  {
    id: 1,
    title: "Smart Contract Development",
    client: "John Smith",
    clientRating: 4.8,
    description: "Need a developer to create a custom ERC-20 token with specific functionality.",
    budget: "0.5 ETH",
    deadline: "7 days",
    category: "Smart Contracts",
    skills: ["Solidity", "ERC-20", "OpenZeppelin"],
    postedDate: "2 days ago",
  },
  {
    id: 2,
    title: "DApp Frontend Design",
    client: "Emma Davis",
    clientRating: 4.5,
    description: "Looking for a UI/UX designer to create a modern interface for our DeFi application.",
    budget: "0.3 ETH",
    deadline: "5 days",
    category: "DApp Development",
    skills: ["React", "Web3.js", "UI/UX"],
    postedDate: "1 day ago",
  },
  {
    id: 3,
    title: "NFT Marketplace Integration",
    client: "Michael Brown",
    clientRating: 4.2,
    description: "Need to integrate our existing NFT collection with a marketplace.",
    budget: "0.6 ETH",
    deadline: "10 days",
    category: "NFT Development",
    skills: ["NFT", "Marketplace", "Smart Contracts"],
    postedDate: "3 days ago",
  },
  {
    id: 4,
    title: "Solidity Code Audit",
    client: "Sarah Williams",
    clientRating: 4.9,
    description: "Need an experienced developer to audit our smart contract for security vulnerabilities.",
    budget: "0.4 ETH",
    deadline: "4 days",
    category: "Blockchain Consulting",
    skills: ["Solidity", "Security", "Auditing"],
    postedDate: "12 hours ago",
  },
]

export default function BrowseJobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [budgetRange, setBudgetRange] = useState([0, 1])
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [proposalMessage, setProposalMessage] = useState("")
  const [proposedBudget, setProposedBudget] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Filter jobs based on search term and filters
  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "" || job.category === selectedCategory
    const jobBudget = Number.parseFloat(job.budget.split(" ")[0])
    const matchesBudget = jobBudget >= budgetRange[0] && jobBudget <= budgetRange[1]

    return matchesSearch && matchesCategory && matchesBudget
  })

  const handleApply = (job: any) => {
    setSelectedJob(job)
    setProposedBudget(job.budget.split(" ")[0])
    setIsDialogOpen(true)
  }

  const handleSubmitProposal = () => {
    // In a real app, you would send this to your API
    console.log("Submitting proposal for job:", selectedJob?.id)
    console.log("Message:", proposalMessage)
    console.log("Proposed Budget:", proposedBudget)

    // Reset form and close dialog
    setProposalMessage("")
    setProposedBudget("")
    setIsDialogOpen(false)

    // Show success message
    alert("Your proposal has been submitted successfully!")
  }

  return (
    <div className="flex-1 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Browse Jobs</h2>
      </div>

      {/* Search and filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Smart Contracts">Smart Contracts</SelectItem>
            <SelectItem value="DApp Development">DApp Development</SelectItem>
            <SelectItem value="Web3 Integration">Web3 Integration</SelectItem>
            <SelectItem value="Blockchain Consulting">Blockchain Consulting</SelectItem>
            <SelectItem value="NFT Development">NFT Development</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative">
          <div className="flex items-center mb-2">
            <Filter className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">
              Budget (ETH): {budgetRange[0]} - {budgetRange[1]}
            </span>
          </div>
          <Slider defaultValue={[0, 1]} max={1} step={0.1} value={budgetRange} onValueChange={setBudgetRange} />
        </div>
      </div>

      {/* Job listings */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription className="mt-1">
                      Posted by {job.client} • {job.postedDate}
                    </CardDescription>
                  </div>
                  <Badge>{job.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-4 text-sm">
                  <div className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>{job.budget}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>Deadline: {job.deadline}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View Details</Button>
                <Button onClick={() => handleApply(job)}>Apply Now</Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Apply dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Apply for Job</DialogTitle>
            <DialogDescription>{selectedJob?.title}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cover Letter</label>
              <Textarea
                placeholder="Introduce yourself and explain why you're a good fit for this job..."
                value={proposalMessage}
                onChange={(e) => setProposalMessage(e.target.value)}
                className="min-h-32"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Your Proposed Budget (ETH)</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={proposedBudget}
                onChange={(e) => setProposedBudget(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Client's budget: {selectedJob?.budget}</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitProposal}>Submit Application</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

