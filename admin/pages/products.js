import Layout from "@/components/Layout";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function Products() {
    return(
        <Layout>
            <Link className="bg-blue-900 text-white rounded-md py-1 px-2" href={'/products/new'}>Add new product</Link>
        </Layout>
    )
}
