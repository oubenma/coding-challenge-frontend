import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, TextFieldProps } from '@material-ui/core';
import MaterialTable from 'material-table';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useContext, useEffect, useState } from 'react'
import ConfirmationDialog from '../components/ConfirmationDialog';
import Layout from '../components/Layout';
import { getDataContext } from '../contexts/dataContext';
import { Category } from '../contexts/types';
import ButtonSubmit from '@material-ui/core/Button';


function CategoryPage() {

  const {
    categories, getCategories, deleteCategory, createCategory, updateCategory
  } = useContext(getDataContext);

  useEffect(() => {
    getCategories();
  }, []);

  // this part for deleting category
  const [openValidationDialog, setOpenValidationDialog] = React.useState<boolean>(false);
  const [confirmationMessage, setConfirmationMessage] = React.useState<string>('');
  const [id, setId] = React.useState<number>();


  const onClickDelete = (id: number) => {
    setOpenValidationDialog(true);
    setConfirmationMessage('do you want to delete this category ?');
    setId(id);
  };

  const handletakeAction = () => {
    deleteCategory(id!);
  };

  const onConfirmationDialogClose = () => {
    setOpenValidationDialog(false);
  };

  // this part for adding new category
  const [category, setCategory] = useState<Category>({
    title: ''
  });
  const [dialogAction, setDialogAction] = useState('');
  const [openFormDialog, setOpenFormDialog] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    setOpenFormDialog(true);
  };

  const handleClose = () => {
    setOpenFormDialog(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dialogAction === 'add') {
      createCategory(category);
    } else {
      updateCategory(category);
    }
    setOpenFormDialog(false);
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setCategory({ ...category, [event.target.name]: event.target.value });
  };

  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);

  const handleChangeAutocompleteCategory = (
    event: React.ChangeEvent<{}>,
    value: Category | null
  ) => {
    if (value != null && value.id) {
      setSelectedCategory(value);
      setCategory({ ...category, parent: value });
    }
  };


  return (
    <Layout>
      <ConfirmationDialog
        confirmationMessage={confirmationMessage}
        isConfirmationDialogOpen={openValidationDialog}
        handleClose={onConfirmationDialogClose}
        takeAction={handletakeAction}
      />
      <MaterialTable
        title="Categories"
        columns={[

          { title: 'Title', field: 'title' },
        ]}
        data={categories}
        parentChildData={(row, rows) => rows.find(a => a.id === row.parent?.id)}


        actions={[
          {
            icon: 'add',
            tooltip: 'Add Category',
            isFreeAction: true,
            onClick: event => {
              setCategory({ title: '' });
              setDialogAction('add');
              handleClickOpen();
              setSelectedCategory(undefined);
            }
          },
          {
            icon: 'edit',
            tooltip: 'edit category',
            onClick: (event, rowData: Category | any) => {
              setCategory({ id: rowData.id, title: rowData.title })
              setDialogAction('edit');
              handleClickOpen();
            }
          },
          {
            icon: 'delete',
            tooltip: 'Delete Category',
            onClick: (event, rowData: Category | any) => {
              onClickDelete(rowData.id);
            }
          }
        ]}
      />

      <Dialog
        open={openFormDialog}
        onClose={handleClose}
        aria-labelledby="add-category-form"
      >
        <DialogTitle id="add-category-form">
          {dialogAction === 'add'
            ? 'Add new category'
            : 'update this category'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              name="title"
              label="category title"
              fullWidth
              required
              value={category.title}
              onChange={handleChange}
            />
            <Autocomplete
              id="title"
              options={categories as Category[]}
              onChange={handleChangeAutocompleteCategory}
              value={selectedCategory}
              getOptionLabel={(option: { title: any; }) => {
                return option.title;
              }}
              renderOption={(option: { title: any; }) => option.title}
              renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} label="Parent category" />}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <ButtonSubmit type="submit" color="primary">
              {dialogAction === 'add' ? 'Add' : 'Update'}
            </ButtonSubmit>
          </DialogActions>
        </form>
      </Dialog>
    </Layout>
  )
}

export default CategoryPage;
