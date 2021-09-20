import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
import "./styles.css";
import Axios from "axios"
import { useMutation } from "@apollo/react-hooks";
import { ADD_PRODUCT } from '../utils/mutations';
import { QUERY_PRODUCTS} from '../utils/queries';

function Home() {
  // const { user } = useContext(AuthContext);

  //-------ADD PRODUCT--------

    const [imageSelected, setImageSelected] = useState()
    const [urlCloud, seturlCloud] = useState({ image: "" })
    const [formState, setFormState] = useState({ name: '', description: '', quantity: 0, price: 0.00, image: "", category: "" });
    const [addProduct] = useMutation(ADD_PRODUCT);
    const { loading, error, data } = useQuery(QUERY_PRODUCTS)

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        await addProduct({
            variables: {
                name: formState.name,
                description: formState.description,
                quantity: formState.quantity,
                price: formState.price,
                image: urlCloud.image,
                category: formState.category,
            },
        });
        addProduct();
    };
    let url = "";
    const uploadImage = async (event) => {
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", 'qyk1qieu')
        
        Axios.post(`https://api.cloudinary.com/v1_1/dquhmekvj/image/upload`, formData).then((response) => {
            console.log(response)
            url = response.data.url
            console.log(url)
            seturlCloud({
                ...urlCloud,
                image: url
            })
            console.log(seturlCloud);


            // /*    setFormState({
            //     ...formState,
            //     image: url,
            //    }); */
              })
            }
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "image") {
        setImageSelected(event.target.files[0]);
        const formData = new FormData()
        formData.append("file", imageSelected)
        /** formData.append("upload_preset",<Upload presets Name>) */

    }
    setFormState({
        ...formState,
        [name]: value,
    });
};

  return (
    <div className="container">
      <div>
        <div>
        <div className="container">
            {/* <Link to="/myProducts">← Go your products</Link> */}
            <div>
                <h2>Add New Product</h2>
                {/* onClick={uploadImage} */}
                <button className="btn waves-effect waves-light #ffb300 amber darken-1"onClick={uploadImage} >Upload Photo</button> 
            </div>
            <div className="input-field">
                <form onSubmit={handleFormSubmit}>
                {/* onSubmit={handleFormSubmit} */}
                    <label htmlFor="image"></label>
                    <input
                        name="image"
                        type="file"
                        id="image"
                        onChange={handleChange}
                    />
                    <label htmlFor="name"></label>
                    <input
                        placeholder="Name"
                        name="name"
                        // type="firstName"
                        id="name"
                        onChange={handleChange}
                    />
                    <label htmlFor="description"></label>
                    <input
                        placeholder="Description"
                        name="description"
                        // type="lastName"
                        id="description"
                        onChange={handleChange}
                    />
                    <label htmlFor="quantity"></label>
                    <input
                        placeholder="Quantity"
                        name="quantity"
                        type="number"
                        id="quantity"
                        min="0"
                        onChange={handleChange}
                    />
                    <label htmlFor="price"></label>
                    <input
                        placeholder="Price"
                        name="price"
                        type="number"
                        id="description"
                        min="0"
                        step="0.01"
                        onChange={handleChange}
                    />
                    <label htmlFor="category" ></label>
                    <select name="category" className="browser-default" defaultValue >
                      {/* onChange={handleChange} */}
                        <option value="DEFAULT">Choose your category</option>
                        {data.categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
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
        </div>
        {/* {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <div key={post._id} style={{ marginBottom: 20 }}>
                  <PostCard key={post._id} post={post} />
                </div>
              ))}
          </Transition.Group>
        )} */}
      </div>
    </div>
  );
}

export default Home;
