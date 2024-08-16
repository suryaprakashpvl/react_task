import React, { useEffect, useState } from 'react';
import Navbar from '../component/navbar';
import { getProduct, DeleteProduct, UpdateProduct } from '../action/user.action';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Home() {
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [loading, setLoading] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedpid, setselectedpid] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading("load")
      const { result } = await getProduct();
      setProductList(result);
      setLoading(false)

    } catch (err) {
      console.log(err);
      toast.error('Failed to fetch products');
    }
  };

  const handleDelete = async (productId) => {
    setLoading('delete');
    try {
      setselectedpid(productId)
      const { status, message } = await DeleteProduct({ pid: productId });
      if (status) {
        toast.success(message);
        fetchProducts(); 
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading('');
    }
  };

  const handleEditSubmit = async () => {
    setLoading('edit');
    try {
      const { product_name, product_qty, product_price, product_id } = selectedProduct;
      const reqData = { pname: product_name, pqty: product_qty, pprice: product_price, pid: product_id };
      const { status, message, error } = await UpdateProduct(reqData);
      if (status) {
        toast.success(message);
        setSelectedId(null);
        fetchProducts(); 
      } else {
        toast.error(error.pqty || error.pname || error.pprice);
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading('');
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setSelectedId(product._id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderInput = (row, field) => (
    selectedId === row._id ? (
      <input
        name={field}
        value={selectedProduct[field]}
        onChange={handleChange}
      />
    ) : (
      row[field]
    )
  );

  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: 'Product Name',
      selector: (row) => renderInput(row, 'product_name'),
      sortable: true,
    },
    {
      name: 'Product Quantity',
      selector: (row) => renderInput(row, 'product_qty'),
      sortable: true,
    },
    {
      name: 'Product Price',
      selector: (row) => renderInput(row, 'product_price'),
      sortable: true,
    },
    {
      name: 'Edit',
      cell: (row) => (
        <Button
          variant="warning"
          size="sm"
          onClick={selectedId === row._id ? handleEditSubmit : () => handleEdit(row)}
          disabled={loading === 'edit'}
        >
          {loading === 'edit' && selectedId === row._id ? (
            <i className="fa fa-spinner fa-spin" style={{ fontSize: '24px' }} />
          ) : selectedId === row._id ? 'Update' : 'Edit'}
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: 'Delete',
      cell: (row) => (
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleDelete(row.product_id)}
          disabled={loading === 'delete'}
        >
          {loading == 'delete'&&selectedpid==row.product_id ? (
            <i className="fa fa-spinner fa-spin" style={{ fontSize: '24px' }} />
          ) : 'Delete'}
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <>
      <Navbar />
      <h3>Product List</h3>
      <DataTable
        columns={columns}
        data={productList}
        progressPending={loading === 'load'}
      />
    </>
  );
}

export default Home;
