"use client";

import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddIcon from "@mui/icons-material/Add";
import AddCategoryTypeModal from "@/components/modal/AddCategoryTypeModal";
import ActionMenu from "../ActionMenu";
import ConfirmDeleteModal from "../modal/ConfirmDeleteModal";
import AddCategoryModal from "../modal/AddCategoryModal";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { usePathname, useRouter } from "next/navigation";

type Category = {
  id: string;
  name: string;
  tasks?: { id: string }[]; 
  typeId: string;
};

type CategoryType = {
  id: string;
  name: string;
  emoji: string;
  categories: Category[];
};

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const activeCategoryId = pathname.startsWith("/category/") ? pathname.split("/").pop() : "";
  
  const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selected, setSelected] = useState<CategoryType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);

  const fetchData = async () => {
    console.log("fetching data");
    setLoading(true);
    const res = await fetch("/api/category-type", {
      cache: "no-store",
      headers: {
        Authorization: "Bearer fortestapikey123",
      },
    });
    const data = await res.json();
    setCategoryTypes(data);

    if (data.length > 0) {
      setExpanded((prev) => ({ ...prev, [data[0].id]: true }));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggle = (typeId: string) => {
    setExpanded((prev) => ({ ...prev, [typeId]: !prev[typeId] }));
  };

  return (
    <aside className="w-64 bg-white border-r p-4 text-sm">
      <div className="space-y-4">
        {loading ? (
          <div className="ml-6 mt-1 space-y-2 animate-pulse text-gray-300">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ) : (
          categoryTypes.map((type) => (
            <div key={type.id}>
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center gap-2 font-bold cursor-pointer text-mediumGray"
                  onClick={() => handleToggle(type.id)}
                >
                  {expanded[type.id] ? (
                    <KeyboardArrowDownIcon fontSize="small" />
                  ) : (
                    <KeyboardArrowRightIcon fontSize="small" />
                  )}
                  <span>{type.emoji}</span>
                  <span>{type.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AddIcon
                    fontSize="small"
                    className="cursor-pointer text-gray-500"
                    onClick={() => {
                      setSelectedTypeId(type.id);
                      setOpenCategoryModal(true);
                    }}
                  />
                  <ActionMenu
                    icon={<AutoAwesomeIcon fontSize="small" className="text-gray-500" />}
                    onRename={() => {
                      setSelected(type);
                      setOpenModal(true);
                    }}
                    onDelete={() => {
                      setSelected(type);
                      setDeleteConfirmOpen(true);
                    }}
                  />
                </div>
              </div>
              {expanded[type.id] && (
                <ul className="ml-6 mt-1 space-y-1">
                  {type.categories.map((cat) => (
                    <li
                      key={cat.id}
                      className="flex items-center justify-between pt-4 text-gray-700"
                    >
                      <div className="flex items-center gap-1 justify-between w-full text-mediumGray">
                      <span
                        className={`cursor-pointer ${activeCategoryId === cat.id ? "border-l-4 border-blue-500 pl-2 text-blue-600 font-semibold" : ""}`}
                        onClick={() => router.push(`/category/${cat.id}`)}
                      >
                        {cat.name}
                      </span>
                        <div className="flex items-center justify-between">
                          <ActionMenu
                            icon={<MoreVertIcon fontSize="small" className="text-gray-500" />}
                            onRename={() => {
                              setSelectedCategory(cat);
                              setOpenCategoryModal(true);
                            }}
                            onDelete={() => {
                              setSelectedCategory(cat);
                              setDeleteConfirmOpen(true);
                            }}
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      
        <button
          onClick={() => setOpenModal(true)}
          className="text-defaultBlue text-sm ml-6 mt-2 hover:underline"
        >
          + Add group
        </button>
      </div>
      <AddCategoryTypeModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelected(null);
        }}
        onCreated={fetchData}
        initialData={selected ?? undefined}
      />
      <ConfirmDeleteModal
        open={deleteConfirmOpen}
        onClose={() => {
          setDeleteConfirmOpen(false)
          setSelected(null);
        }}
        onConfirm={async () => {
          if (!selected) return;
          await fetch(`/api/category-type/${selected.id}`, {
            method: "DELETE",
            headers: { Authorization: "Bearer fortestapikey123" },
          });
          setDeleteConfirmOpen(false);
          setSelected(null);
          fetchData();
        }}
      />

      <AddCategoryModal
        open={openCategoryModal}
        onClose={() => {
          setOpenCategoryModal(false);
          setSelectedCategory(null);
        }}
        onCreated={fetchData}
        initialData={selectedCategory ?? undefined}
        typeId={selectedCategory?.typeId ?? selectedTypeId}
      />
    </aside>
  );
};

export default Sidebar;
