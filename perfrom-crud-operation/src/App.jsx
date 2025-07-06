"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Save, X } from "./components/Icons"
import { Button } from "./components/Button"
import { Input } from "./components/Input"
import { Label } from "./components/Label"
import { Card, CardContent } from "./components/Card"
import { Badge } from "./components/Badge"
import { Textarea } from "./components/Textarea"
import { SimpleSelect, SimpleSelectItem } from "./components/SimpleSelect"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./components/Dialog"

export default function CRUDApp() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete project documentation",
      description: "Write comprehensive documentation for the new project",
      status: "in-progress",
      priority: "high",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Review code changes",
      description: "Review and approve pending pull requests",
      status: "pending",
      priority: "medium",
      createdAt: "2024-01-14",
      updatedAt: "2024-01-14",
    },
    {
      id: 3,
      title: "Update dependencies",
      description: "Update all project dependencies to latest versions",
      status: "completed",
      priority: "low",
      createdAt: "2024-01-13",
      updatedAt: "2024-01-16",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [editingTask, setEditingTask] = useState(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
  })

  // CREATE operation
  const createTask = () => {
    if (!newTask.title.trim()) return

    const task = {
      id: Math.max(...tasks.map((t) => t.id), 0) + 1,
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      priority: newTask.priority,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }

    setTasks([...tasks, task])
    setNewTask({ title: "", description: "", status: "pending", priority: "medium" })
    setIsCreateDialogOpen(false)
  }

  // READ operation (with filtering and searching)
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || task.status === filterStatus
    return matchesSearch && matchesFilter
  })

  // UPDATE operation
  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id ? { ...updatedTask, updatedAt: new Date().toISOString().split("T")[0] } : task,
      ),
    )
    setEditingTask(null)
  }

  // DELETE operation
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Task Management System</h1>
        <p className="text-gray-600">Perform CRUD operations on your tasks</p>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <SimpleSelect value={filterStatus} onValueChange={setFilterStatus}>
          <SimpleSelectItem value="all">All Status</SimpleSelectItem>
          <SimpleSelectItem value="pending">Pending</SimpleSelectItem>
          <SimpleSelectItem value="in-progress">In Progress</SimpleSelectItem>
          <SimpleSelectItem value="completed">Completed</SimpleSelectItem>
        </SimpleSelect>

        {/* CREATE Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>Add a new task to your list. Fill in the details below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Enter task description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <SimpleSelect
                    value={newTask.status}
                    onValueChange={(value) => setNewTask({ ...newTask, status: value })}
                  >
                    <SimpleSelectItem value="pending">Pending</SimpleSelectItem>
                    <SimpleSelectItem value="in-progress">In Progress</SimpleSelectItem>
                    <SimpleSelectItem value="completed">Completed</SimpleSelectItem>
                  </SimpleSelect>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <SimpleSelect
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SimpleSelectItem value="low">Low</SimpleSelectItem>
                    <SimpleSelectItem value="medium">Medium</SimpleSelectItem>
                    <SimpleSelectItem value="high">High</SimpleSelectItem>
                  </SimpleSelect>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createTask}>Create Task</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{tasks.length}</div>
            <p className="text-sm text-gray-600">Total Tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {tasks.filter((t) => t.status === "pending").length}
            </div>
            <p className="text-sm text-gray-600">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {tasks.filter((t) => t.status === "in-progress").length}
            </div>
            <p className="text-sm text-gray-600">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {tasks.filter((t) => t.status === "completed").length}
            </div>
            <p className="text-sm text-gray-600">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <div className="grid gap-4">
        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">No tasks found. Create your first task!</p>
            </CardContent>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card key={task.id}>
              <CardContent className="p-6">
                {editingTask?.id === task.id ? (
                  // UPDATE Form
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`edit-title-${task.id}`}>Title</Label>
                      <Input
                        id={`edit-title-${task.id}`}
                        value={editingTask.title}
                        onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`edit-description-${task.id}`}>Description</Label>
                      <Textarea
                        id={`edit-description-${task.id}`}
                        value={editingTask.description}
                        onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Status</Label>
                        <SimpleSelect
                          value={editingTask.status}
                          onValueChange={(value) => setEditingTask({ ...editingTask, status: value })}
                        >
                          <SimpleSelectItem value="pending">Pending</SimpleSelectItem>
                          <SimpleSelectItem value="in-progress">In Progress</SimpleSelectItem>
                          <SimpleSelectItem value="completed">Completed</SimpleSelectItem>
                        </SimpleSelect>
                      </div>
                      <div className="grid gap-2">
                        <Label>Priority</Label>
                        <SimpleSelect
                          value={editingTask.priority}
                          onValueChange={(value) => setEditingTask({ ...editingTask, priority: value })}
                        >
                          <SimpleSelectItem value="low">Low</SimpleSelectItem>
                          <SimpleSelectItem value="medium">Medium</SimpleSelectItem>
                          <SimpleSelectItem value="high">High</SimpleSelectItem>
                        </SimpleSelect>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setEditingTask(null)}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button onClick={() => updateTask(editingTask)}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  // READ View
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingTask(task)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteTask(task.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{task.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className={getStatusColor(task.status)}>{task.status.replace("-", " ")}</Badge>
                      <Badge className={getPriorityColor(task.priority)}>{task.priority} priority</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      Created: {task.createdAt} | Updated: {task.updatedAt}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
