import React from "react";
import { useMutation } from "@apollo/react-hooks";
// import { ADD_PRODUCT } from '../utils/mutations';
// import { QUERY_CATEGORIES } from '../utils/queries';
import { useForm } from "../util/hooks";
// import { FETCH_POSTS_QUERY } from "../util/graphql";
import { CREATE_POST_MUTATION } from "../util/mutations";
import "../pages/styles.css";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    description: "",
  });

  const [addPost, ] = useMutation(CREATE_POST_MUTATION, {
    variables: { picture: "https://react.semantic-ui.com/images/avatar/large/molly.png", description: values.description },
    // update(proxy, result) {
    //   const data = proxy.readQuery({
    //     query: FETCH_POSTS_QUERY,
    //   });
    //   data.getPosts = [result.data.createPost, ...data.getPosts];
    //   proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
    //   values.body = "";
    // },
  });

  function createPostCallback() {
    addPost();
    // window.location = "/";
  }

  //-------ADD PRODUCT--------

    // const [imageSelected, setImageSelected] = useState()
    // const [urlCloud, seturlCloud] = useState({ image: "" })
    // const [formState, setFormState] = useState({ name: '', description: '', quantity: 0, price: 0.00, image: "", category: "" });
    // const [addProduct] = useMutation(ADD_PRODUCT);
    // const { loading, error, data } = useQuery(QUERY_CATEGORIES)

//     if (loading) return 'Loading...';

//     const handleFormSubmit = async (event) => {
//         event.preventDefault();
//         await addProduct({
//             variables: {
//                 name: formState.name,
//                 description: formState.description,
//                 quantity: formState.quantity,
//                 price: formState.price,
//                 image: urlCloud.image,
//                 category: formState.category,
//             },
//         });
//         Auth.addProduct();
//     };
//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     if (name === "image") {
//         setImageSelected(event.target.files[0]);
//         const formData = new FormData()
//         formData.append("file", imageSelected)
//         /** formData.append("upload_preset",<Upload presets Name>) */

//     }
//     setFormState({
//         ...formState,
//         [name]: value,
//     });
// };
  return (
    <>
        <div className="container">
            {/* <Link to="/myProducts">← Go your products</Link> */}

            <div>
                <h2>Add New Product</h2>
                {/* onClick={uploadImage} */}
                <button className="btn waves-effect waves-light #ffb300 amber darken-1">Upload Photo</button> 
            </div>
            <div className="input-field">
                <form  >
                {/* onSubmit={handleFormSubmit} */}
                    <label htmlFor="image"></label>
                    <input
                        name="image"
                        type="file"
                        id="image"
                        // onChange={handleChange}
                    />
                    <label htmlFor="name"></label>
                    <input
                        placeholder="Name"
                        name="name"
                        // type="firstName"
                        id="name"
                        // onChange={handleChange}
                    />
                    <label htmlFor="description"></label>
                    <input
                        placeholder="Description"
                        name="description"
                        // type="lastName"
                        id="description"
                        // onChange={handleChange}
                    />

                    <label htmlFor="quantity"></label>
                    <input
                        placeholder="Quantity"
                        name="quantity"
                        type="number"
                        id="quantity"
                        min="0"
                        // onChange={handleChange}
                    />

                    <label htmlFor="price"></label>
                    <input
                        placeholder="Price"
                        name="price"
                        type="number"
                        id="description"
                        min="0"
                        step="0.01"
                        // onChange={handleChange}
                    />



                    <label htmlFor="category" ></label>
                    <select name="category" className="browser-default" defaultValue >
                      {/* onChange={handleChange} */}
                        <option value="DEFAULT">Choose your category</option>
                        {/* {data.categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))} */}
                    </select>




                    <br></br>
                    <br></br>
                    <div>
                        <button className="btn waves-effect waves-light #ffb300 amber darken-1" type="submit" >Add product</button>
                    </div>
                </form>

            </div>
        </div>
    );


    </>
  );
}

export default PostForm;
