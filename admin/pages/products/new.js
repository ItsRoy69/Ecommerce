import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

export default function NewProduct() {
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [price,setPrice] = useState('');
  const [goToProducts,setGoToProducts] = useState(false);
  const router = useRouter();

  async function createProduct() {
    ev.preventDefault();
    const data = {title,description,price};
    axios.post('/api/products', data)
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push('/products');
  }

  return (
    <Layout>
        <form onSubmit={createProduct}>
            <h1>New Product</h1>
            <label>Product Name</label>
            <input type="text" placeholder="Product Name" value={title} onChange={ev => setTitle(ev.target.value)}/>
            <label>Description</label>
            <textarea placeholder="Product Description" value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
            <label>Price (in USD)</label>
            <input type="number" placeholder="Price" value={price} onChange={ev => setPrice(ev.target.value)}></input>
            <button className="btn-primary">
                Save
            </button>
        </form>
    </Layout>
  );
}
