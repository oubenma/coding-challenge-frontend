import React, { createContext, useState } from 'react';
import { callApi } from '../utils/apiCalls';
import { OPTIONS } from '../utils/constants';
import { Category, Product } from './types';
import { Method, AxiosResponse } from 'axios';

interface ContextOptions {
  categories: Array<Category>,
  getCategories: () => void;
  deleteCategory: (id: number) => void;
  createCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  products: Array<Product>,
  getproducts: () => void;
  deleteProduct: (id: number) => void;
  createProduct: (Product: Product) => void;
  updateProduct: (product: Product) => void;
  getExchangeRates: (base: string, target: string) => void;
  exchangeRate: number;
}

//TODO: temporary solution tobe removed
/* eslint-disable-next-line */
const doSomething = () => { };

export const getDataContext = createContext<ContextOptions>({
  categories: Array<Category>(),
  getCategories: () => {
    doSomething();
  },
  deleteCategory: (id: number) => {
    doSomething();
  },
  createCategory: (category: Category) => {
    doSomething();
  },
  updateCategory: (category: Category) => {
    doSomething();
  },
  products: Array<Product>(),
  getproducts: () => {
    doSomething();
  },
  deleteProduct: (id: number) => {
    doSomething();
  },
  createProduct: (product: Product) => {
    doSomething();
  },
  updateProduct: (product: Product) => {
    doSomething();
  },
  getExchangeRates: (base: string, target: string) => {
    doSomething();
  },
  exchangeRate: 1,
});

export const ContextProvider = (props: any) => {

  // category section
  const [categories, setCategories] = useState(Array<Category>());

  const getCategories = () => {
    callApi('http://localhost:8080/categories', OPTIONS.GET as Method)
      .then((response: AxiosResponse['data']) => {
        setCategories(response.data);
      })
  };

  const deleteCategory = (id: number) => {
    callApi(`http://localhost:8080/categories/${id}`, OPTIONS.DELETE as Method)
      .then((response: AxiosResponse['data']) => {
        getCategories();
      })
  };

  const createCategory = (category: Category) => {

    if (category.parent?.id === undefined) {
      callApi(`http://localhost:8080/categories`, OPTIONS.POST as Method, category)
        .then((response: AxiosResponse['data']) => {
          getCategories();
        })
    } else {

      callApi(`http://localhost:8080/categories/${category.parent?.id}`, OPTIONS.POST as Method, category)
        .then((response: AxiosResponse['data']) => {
          getCategories();
        })
    }

  };

  const updateCategory = (category: Category) => {
    callApi(`http://localhost:8080/categories/${category.id}`, OPTIONS.PUT as Method, category)
      .then((response: AxiosResponse['data']) => {
        getCategories();
      });
  };

  // products section
  const [products, setProducts] = useState(Array<Product>());

  const getproducts = () => {
    callApi('http://localhost:8080/products', OPTIONS.GET as Method)
      .then((response: AxiosResponse['data']) => {
        setProducts(response.data);
      })
  };
  const deleteProduct = (id: number) => {
    callApi(`http://localhost:8080/products/${id}`, OPTIONS.DELETE as Method)
      .then((response: AxiosResponse['data']) => {
        getproducts();
      })
  };
  const createProduct = (product: Product) => {
    callApi(`http://localhost:8080/products`, OPTIONS.POST as Method, product)
      .then((response: AxiosResponse['data']) => {
        getproducts();
      });
  };
  const updateProduct = (product: Product) => {
    callApi(`http://localhost:8080/products/${product.id}`, OPTIONS.PUT as Method, product)
      .then((response: AxiosResponse['data']) => {
        getproducts();
      });
  };

  // get exchange rates from fixer.io
  const [exchangeRate, setExchangeRate] = useState<number>(1);

  const getExchangeRates = (base: string, target: string) => {
    // in real life projects its better to put acces key in environment variables
    const url = `http://data.fixer.io/api/latest?access_key=caa095facaae10a586d63b9e21fbb367&base=${base}&symbols=${target}`;

    callApi(url, OPTIONS.GET as Method).then(
      (response: AxiosResponse['data']) => {
        console.log(response.data);
        if (response.data.success === true) {
          setExchangeRate(response.data.rates[target]);
        }

      }
    ).catch((e) => console.log(e));
  };




  const values = {
    categories,
    getCategories,
    deleteCategory,
    createCategory,
    updateCategory,
    products,
    getproducts,
    deleteProduct,
    createProduct,
    updateProduct,
    exchangeRate,
    getExchangeRates
  };

  return (
    <getDataContext.Provider value={values}>
      {props.children}
    </getDataContext.Provider>
  );
};
