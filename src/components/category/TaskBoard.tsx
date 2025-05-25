"use client";

import { useEffect, useState } from "react";
import { TaskWithId } from "@/features/task/task.schema";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import clsx from "clsx";
import AddTaskModal from "@/components/modal/AddTaskModal";
import { useParams } from "next/navigation";
import ActionMenu from "@/components/ActionMenu";
import ConfirmDeleteModal from "../modal/ConfirmDeleteModal";

const pageSize = 10;

const TaskBoard = () => {
  const [todoTasks, setTodoTasks] = useState<TaskWithId[]>([]);
  const [doneTasks, setDoneTasks] = useState<TaskWithId[]>([]);
  const [todoPage, setTodoPage] = useState(1);
  const [donePage, setDonePage] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskWithId | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const params = useParams();
  const categoryId = params?.id as string;

  const fetchTasks = async () => {
    const [todoRes, doneRes] = await Promise.all([
      fetch(`/api/task?categoryId=${categoryId}&isComplete=false&page=${todoPage}&pageSize=${pageSize}`, {
        headers: { Authorization: "Bearer fortestapikey123" },
      }),
      fetch(`/api/task?categoryId=${categoryId}&isComplete=true&page=${donePage}&pageSize=${pageSize}`, {
        headers: { Authorization: "Bearer fortestapikey123" },
      }),
    ]);
    setTodoTasks(await todoRes.json());
    setDoneTasks(await doneRes.json());
  };

  useEffect(() => {
    if (categoryId) fetchTasks();
  }, [categoryId, todoPage, donePage]);

  const priorityColors: Record<string, string> = {
    LOW: "bg-[#D3EED4] text-[#388E3C]",
    MEDIUM: "bg-[#FEEDC3] text-[#C89004]",
    HIGH: "bg-[#FFD4C2] text-[#FF6727]",
    URGENT: "bg-[#F7CACE] text-[#B21A2A]",
  };

  const onComplete = async () => {
    if (!selectedTask) return;
    await fetch(`/api/task/${selectedTask.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer fortestapikey123",
      },
      body: JSON.stringify({ isComplete: true }),
    });
    setSelectedTask(null);
    fetchTasks();
  };

  const renderTask = (task: TaskWithId, isDone = false) => (
    <div key={task.id} className={clsx("border rounded-md p-4 bg-white shadow-sm space-y-1", isDone && "opacity-60")}>
      <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
        <span className={clsx("text-xs font-medium px-2 py-0.5 rounded-full inline-block w-fit", priorityColors[task.priority])}>
          {task.priority}
        </span>
        <div className="flex justify-between items-center gap-1">
          <AccessTimeIcon fontSize="inherit" />
          <span>{task.startTime} - {task.endTime}</span>
          {!isDone && (
            <ActionMenu
              icon={<MoreVertIcon fontSize="small" className="text-gray-500" />}
              onRename={() => {
                setSelectedTask(task);
                setOpenModal(true);
              }}
              onDelete={() => {
                setSelectedTask(task);
                setDeleteConfirmOpen(true);
              }}
              onComplete={() => {
                setSelectedTask(task);
                onComplete();
              }}
            />
          )}
        </div>
      </div>
      <h2 className={clsx("font-medium text-gray-800", isDone && "line-through")}>{task.title}</h2>
      <p className={clsx("text-sm text-gray-500", isDone && "line-through")}>{task.description}</p>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        {/* TO DO Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-medium text-gray-700">
              <span className="text-sm text-mediumGray"><TaskAltIcon /> TO DO</span>
              <span className="bg-gray-200 text-xs px-2 py-0.5 rounded-full">{todoTasks.length}</span>
            </div>
            <div onClick={() => setOpenModal(true)} className="flex items-center gap-3 text-defaultBlue text-sm cursor-pointer">
              <AddIcon fontSize="small" />
              <span>Add task</span>
            </div>
          </div>
          <div className="space-y-4">
            {todoTasks.map(task => renderTask(task))}
          </div>
          <div className="flex gap-2 mt-4">
            {todoPage > 1 && (
              <button onClick={() => setTodoPage(p => p - 1)} className="text-sm text-blue-600 underline">Previous</button>
            )}
            {todoTasks.length === pageSize && (
              <button onClick={() => setTodoPage(p => p + 1)} className="text-sm text-blue-600 underline">Load more</button>
            )}
          </div>
        </div>

        {/* COMPLETED Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-medium text-gray-700">
              <span className="text-greenCorrect text-sm"><CheckCircleIcon /> COMPLETED</span>
              <span className="bg-gray-200 text-xs px-2 py-0.5 rounded-full">{doneTasks.length}</span>
            </div>
          </div>
          <div className="space-y-4">
            {doneTasks.map(task => renderTask(task, true))}
          </div>
          <div className="flex gap-2 mt-4">
            {donePage > 1 && (
              <button onClick={() => setDonePage(p => p - 1)} className="text-sm text-blue-600 underline">Previous</button>
            )}
            {doneTasks.length === pageSize && (
              <button onClick={() => setDonePage(p => p + 1)} className="text-sm text-blue-600 underline">Load more</button>
            )}
          </div>
        </div>
      </div>

      <AddTaskModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedTask(null);
        }}
        onCreated={fetchTasks}
        initialData={selectedTask ?? undefined}
        categoryId={categoryId}
      />

      <ConfirmDeleteModal
        open={deleteConfirmOpen}
        onClose={() => {
          setDeleteConfirmOpen(false);
          setSelectedTask(null);
        }}
        onConfirm={async () => {
          if (!selectedTask) return;
          await fetch(`/api/task/${selectedTask.id}`, {
            method: "DELETE",
            headers: { Authorization: "Bearer fortestapikey123" },
          });
          setDeleteConfirmOpen(false);
          setSelectedTask(null);
          fetchTasks();
        }}
      />
    </>
  );
};

export default TaskBoard;
