import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
    const [editedCategory, setEditedCategory] = useState(null); // [1
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState("");
    const [properties, setProperties] = useState([]);
    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        axios.get("/api/categories").then((result) => {
            setCategories(result.data);
        });
    }

    async function saveCategory(ev) {
        ev.preventDefault();

        const data = {
            name, parentCategory, properties: properties.map(p => ({
                name: p.name, values: p.values.split(","),
            })),
        };

        if (editedCategory) {
            data._id = editedCategory._id;
            await axios.put("/api/categories", data);
            setEditedCategory(null);
        } else {
            await axios.post("/api/categories", data);
        }

        setName("");
        setParentCategory("");
        setProperties([]);
        fetchCategories();
    }

    function editCategory(category) {
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id || "");
        setProperties(category.properties.map(({ name, values }) => ({
            name,
            values: values.join(",")
        }))
        );


    }

    function deleteCategory(category) {
        swal
            .fire({
                title: "Are you sure ?",
                text: `Do you want to delete ${category.name}?`,
                showCancelButton: true,
                cancelButtonText: "Cancel",
                confirmButtonText: "Yes, Delete!",
                confirmButtonColor: "#d55",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const { _id } = category;
                    await axios.delete("/api/categories?_id=" + _id);
                    fetchCategories();
                }
            });
    }

    function addProperty() {
        setProperties((prev) => {
            return [...prev, { name: "", values: "" }];
        });
    }

    function handlePropertyNameChange(index, property, newName) {
        setProperties((prev) => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        });
    }

    function handlePropertyValuesChange(index, property, newValues) {
        setProperties((prev) => {
            const properties = [...prev];
            properties[index].values = newValues;
            return properties;
        });
    }

    function removeProperty(indexToRemove) {
        setProperties((prev) => {
            return [...prev].filter((p, pIndex) => {
                return pIndex !== indexToRemove;
            });
        });
    }

    return (
        <Layout>
            <h1>Categories</h1>
            <label>
                {editedCategory
                    ? `Edit category ${editedCategory.name}`
                    : "Create new category"}
            </label>
            <form onSubmit={saveCategory}>
                <div className="flex gap-1">
                    <input
                        type="text"
                        placeholder={"Category Name"}
                        onChange={(ev) => setName(ev.target.value)}
                        value={name}
                    />
                    <select
                        onChange={(ev) => setParentCategory(ev.target.value)}
                        value={parentCategory}
                    >
                        <option value="">No parent category</option>
                        {categories.length > 0 &&
                            categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="mb-2">
                    <label className="block">Properties</label>
                    <button
                        type="button"
                        onClick={addProperty}
                        className="btn-default text-sm"
                    >
                        Add New Property
                    </button>
                    {properties.length > 0 &&
                        properties.map((property, index) => (
                            <div className="flex gap-1 mb-2">
                                <input
                                    type="text"
                                    placeholder="property Name (example: color)"
                                    value={property.name}
                                    className="mb-0"
                                    onChange={(ev) =>
                                        handlePropertyNameChange(index, property, ev.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="values, comma separated"
                                    value={property.values}
                                    className="mb-0"
                                    onChange={(ev) =>
                                        handlePropertyValuesChange(index, property, ev.target.value)
                                    }
                                />

                                <button
                                    type="button"
                                    onClick={() => removeProperty(index)}
                                    className="btn-default"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                </div>
                <div className="flex gap-1">
                    {editedCategory && (
                        <button
                            className="btn-default"
                            type="button"
                            onClick={() => {
                                setEditedCategory(null);
                                setName("");
                                setParentCategory("");
                                setProperties([]);
                            }}
                        >
                            Cancel
                        </button>
                    )}

                    <button type="submit" className="btn-primary py-1">
                        Save
                    </button>
                </div>
            </form>
            {!editedCategory && (
                <table className="basic mt-4">
                    <thead>
                        <tr>
                            <td>Category Name</td>
                            <td>Parent category</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 &&
                            categories.map((category) => (
                                <tr key={category._id}>
                                    <td>{category.name}</td>
                                    <td>{category?.parent?.name}</td>
                                    <td>
                                        <button
                                            onClick={() => editCategory(category)}
                                            className="btn-default mr-1"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteCategory(category)}
                                            className="btn-red"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
        </Layout>
    );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
