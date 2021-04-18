import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import ButtonSubmit from '@material-ui/core/Button';
import { Autocomplete } from '@material-ui/lab';
import MaterialTable from 'material-table';
import React, { useContext, useEffect, useState } from 'react';
import ConfirmationDialog from '../components/ConfirmationDialog';
import Layout from '../components/Layout';
import { getDataContext } from '../contexts/dataContext';
import { Category, Product } from '../contexts/types';
import { CURRENCIES_CODES } from '../utils/constants';


function ProductPage() {

  const {
    products,
    getproducts,
    deleteProduct,
    createProduct,
    updateProduct,
    categories,
    exchangeRate,
    getExchangeRates
  } = useContext(getDataContext);

  useEffect(() => {
    getproducts();
  }, []);


  // this part for deleting products
  const [openValidationDialog, setOpenValidationDialog] = React.useState<boolean>(false);
  const [confirmationMessage, setConfirmationMessage] = React.useState<string>('');
  const [id, setId] = React.useState<number>();


  const onClickDelete = (id: number) => {
    setOpenValidationDialog(true);
    setConfirmationMessage('do you want to delete this product ?');
    setId(id);
  };

  const handletakeAction = () => {
    deleteProduct(id!);
  };

  const onConfirmationDialogClose = () => {
    setOpenValidationDialog(false);
  };

  // this part for adding new product
  const [product, setProduct] = useState<Product>({
    title: '',
    originalCurrency: 'EUR',
    originalPrice: 0,
    euroPrice: 0
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
      createProduct({ ...product, euroPrice: product.originalPrice / exchangeRate, originalCurrency: selectedCurrency });
    } else {
      updateProduct({ ...product, euroPrice: product.originalPrice / exchangeRate, originalCurrency: selectedCurrency });
    }
    setOpenFormDialog(false);
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };


  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);

  const handleChangeAutocompleteCategory = (
    event: React.ChangeEvent<{}>,
    value: Category | null
  ) => {
    if (value != null && value.id) {
      setSelectedCategory(value);
      setProduct({ ...product, category: value });
    }
  };

  const [selectedCurrency, setSelectedCurrency] = useState<string>("EUR");

  const handleChangeCurrency = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    if (value != null) {
      setSelectedCurrency(value);
      getExchangeRates("EUR", value);
      setProduct({ ...product, originalCurrency: value });
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
        title="Products"
        columns={[

          { title: 'Title', field: 'title' },
          { title: 'Price in original curr', field: 'originalPrice', type: 'numeric' },
          { title: 'Original Currency', field: 'originalCurrency' },
          { title: 'Price in Euro', field: 'euroPrice', type: 'numeric' },
        ]}
        data={products}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add Product',
            isFreeAction: true,
            onClick: event => {
              setProduct({ title: '', originalCurrency: '', originalPrice: 0 });
              setDialogAction('add');
              setSelectedCategory(undefined);
              handleClickOpen();
            }
          },
          {
            icon: 'edit',
            tooltip: 'edit Product',
            onClick: (event, rowData: Product | any) => {
              setProduct({ id: rowData.id, title: rowData.title, originalPrice: rowData.originalPrice, originalCurrency: rowData.originalCurrency })
              setDialogAction('edit');
              handleClickOpen();
            }
          },
          {
            icon: 'delete',
            tooltip: 'Delete Product',
            onClick: (event, rowData: Product | any) => {
              onClickDelete(rowData.id);
            }
          }
        ]}
      />

      <Dialog
        open={openFormDialog}
        onClose={handleClose}
        aria-labelledby="add-product-form"
      >
        <DialogTitle id="add-product-form">
          {dialogAction === 'add'
            ? 'Add new product'
            : 'update this product'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              name="title"
              label="title"
              fullWidth
              required
              value={product.title}
              onChange={handleChange}
            />

            <TextField
              name="originalPrice"
              label="price"
              fullWidth
              required
              value={product.originalPrice}
              onChange={handleChange}
            />

            <Autocomplete
              id="currency"
              options={CURRENCIES_CODES}
              onChange={handleChangeCurrency}
              value={selectedCurrency}
              getOptionLabel={(option) => {
                return option;
              }}
              renderOption={(option) => option}
              renderInput={params => <TextField {...params} defaultValue="EUR" label="Currency" />}
            />

            <Autocomplete
              id="category"
              options={categories as Category[]}
              onChange={handleChangeAutocompleteCategory}
              value={selectedCategory}
              getOptionLabel={(option: { title: any; }) => {
                return option.title;
              }}
              renderOption={(option: { title: any; }) => option.title}
              renderInput={params => <TextField {...params} label="Category" />}
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

export default ProductPage;
