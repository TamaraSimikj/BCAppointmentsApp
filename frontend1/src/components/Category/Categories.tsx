import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Collapse,
  IconButton,
  Box,
  Stack,
  TextField,
} from "@mui/material";
import CategoryService from "../../services/category.service";
import { Category } from "../../data/models/DTOs";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNotification } from "../../hooks/useNotification";
import { Typography, useTheme } from "@material-ui/core";

const Categories = () => {
  const theme = useTheme();
  const [categories, setCategories] = useState<Category[]>([]);
  const { showNotification } = useNotification();
  const [open, setOpen] = React.useState(false);

  //   const [isEditOpen, setisEditOpen] = useState(false);
  const [openEditId, setOpenEditId] = useState<number | null>(null);

  const [newCategory, setNewCategory] = useState<Category>({
    name: "",
    description: "",
  } as Category);

  const [editCategory, setEditCategory] = useState<Category>({} as Category);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await CategoryService.getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (addingNew: boolean, event: any, field: string) => {
    if (addingNew) {
      setNewCategory((prevCategory) => ({
        ...prevCategory,
        [field]: event.target.value,
      }));
    } else {
      setEditCategory((prevCategory) => ({
        ...prevCategory,
        [field]: event.target.value,
      }));
    }
  };

  const handleOpen = () => {
    setOpen(!open);
    setNewCategory({ name: "", description: "" });
  };
  //   const handleEditOpen = (category: Category) => {
  //     setisEditOpen(!isEditOpen);
  //     setEditCategory(category);
  //     console.log("category", category);
  //   };

  const handleEditOpen = (categoryId: number | null) => {
    setOpenEditId(categoryId === openEditId ? null : categoryId);
    setEditCategory(categories.find((category) => category.id === categoryId) || ({} as Category));
  };

  const closeEdit = () => {
    setOpenEditId(null);
    setEditCategory({} as Category);
  };

  const handleAddCategory = async () => {
    try {
      const createdCategory = await CategoryService.createCategory(newCategory);
      setCategories((prevCategories) => [...prevCategories, createdCategory]);
      showNotification("Category added successfully!", "success");
      setOpen(!open);
      setNewCategory({ name: "", description: "" });
    } catch (error) {
      console.error("Error adding category:", error);
      showNotification("Error adding category", "error");
    }
  };

  const handleEditCategory = async () => {
    try {
      const updatedCategory = await CategoryService.updateCategory(editCategory.id, {
        name: editCategory.name,
        description: editCategory.description,
      });

      setCategories((prevCategories) => prevCategories.map((category) => (category.id === updatedCategory.id ? updatedCategory : category)));

      showNotification("Category updated successfully!", "success");
      setOpenEditId(null);
      setEditCategory({} as Category);
    } catch (error) {
      console.error("Error updating category:", error);
      showNotification("Error updating category", "error");
    }
  };

  const handleDelete = async (event: any, categoryId: number) => {
    event.stopPropagation(); // Stop the event from propagating to the parent TableRow
    if (categoryId !== -1) {
      // za ako e undefined
      console.log(`Delete category with ID ${categoryId}`);
      try {
        await CategoryService.deleteCategory(categoryId);
        setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryId));
        showNotification(`Category with ID ${categoryId} deleted successfully!`, "success");
      } catch (error) {
        console.error("Error deleting category:", error);
        showNotification("Error deleting category", "error");
      }
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: 650, margin: "auto", marginTop: "5%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "5px" }}>
                <IconButton aria-label="expand row" size="small" onClick={handleOpen}>
                  {open ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell sx={{ width: "5px" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Typography variant="body2">Create new category:</Typography>

                    <Stack direction={"row"} sx={{ paddingTop: 1 }}>
                      <TextField
                        size="small"
                        id="input-category-name"
                        label="Name"
                        value={newCategory.name}
                        onChange={(event) => handleInputChange(true, event, "name")}
                      />
                      <TextField
                        size="small"
                        sx={{ marginLeft: 1 }}
                        id="input-category-desc"
                        label="Description"
                        multiline
                        maxRows={4}
                        fullWidth
                        value={newCategory.description}
                        onChange={(event) => handleInputChange(true, event, "description")}
                      />
                      <Button size="small" variant="contained" sx={{ marginX: 1 }} onClick={handleAddCategory}>
                        Add
                      </Button>
                      <IconButton size="small" onClick={handleOpen}>
                        <CloseIcon />
                      </IconButton>
                    </Stack>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
            {categories.map((category: Category) => (
              <React.Fragment key={category.id}>
                <TableRow
                  onClick={() => handleEditOpen(category.id || null)}
                  sx={{
                    backgroundColor: openEditId === category.id ? theme.palette.divider : "",
                    position: "relative",
                    "&:hover": {
                      backgroundColor: theme.palette.divider,
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell sx={{ width: "5px" }}></TableCell>
                  <TableCell component="th" scope="row">
                    {category.id}
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell sx={{ width: "5px" }}>
                    <IconButton size="small" onClick={(event) => handleDelete(event, category.id || -1)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow key={category.id + "-edit"}>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={openEditId === category.id} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="body2">Edit category with id: {editCategory.id} </Typography>
                        <Stack direction={"row"} sx={{ paddingTop: 1 }}>
                          <TextField
                            size="small"
                            id="input-category-name-edit"
                            label="Name"
                            value={editCategory.name || ""}
                            onChange={(event) => handleInputChange(false, event, "name")}
                          />
                          <TextField
                            size="small"
                            sx={{ marginLeft: 1 }}
                            id="input-category-desc-edit"
                            label="Description"
                            multiline
                            maxRows={4}
                            fullWidth
                            value={editCategory.description || ""}
                            onChange={(event) => handleInputChange(false, event, "description")}
                          />
                          <Button size="small" variant="contained" sx={{ marginX: 1 }} onClick={handleEditCategory}>
                            Save
                          </Button>
                          <IconButton size="small" onClick={closeEdit}>
                            <CloseIcon />
                          </IconButton>
                        </Stack>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Categories;
