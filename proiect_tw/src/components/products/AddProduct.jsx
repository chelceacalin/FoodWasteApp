import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import auth from "../../firebase.js";
import { v4 as uuidv4, v4 } from 'uuid';
import { navigate, useNavigate } from "react-router-dom";
import storage from '../../firebaseStorage.js'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
const AddProduct = () => {
  const [productDescription, setproductDescription] = useState("");
  const [isTradable, set_isTradable] = useState(true);
  const [contor, setContor] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [categorie, setCategorie] = useState("Meat");
  const [cantitate, setCantitate] = useState(0);
  const [unitsOfMeasure, setunitsOfMeasure] = useState("Kilogram");
  const [foodPhoto, setFoodPhoto] = useState(null);

  let incrementContor = () => {
    setContor((cnt) => {
      if (cnt % 2 == 0) {
        set_isTradable(true);
      }
      else {
        set_isTradable(false);
      }
      return cnt + 1;
    })
  }
  let navigate = useNavigate();


  return (

    <div className="login-box">

      <h1 id="textColorForLoginCreate">Add Product</h1>
      <form >
        <div className="user-box">
          <input
            type="text"
            placeholder="Product Description"
            value={productDescription !== null ? productDescription : "Add Product"}
            onChange={(e) => setproductDescription(e.target.value)}
          ></input>
          <label>Description</label>
        </div>


        <div className="user-box">
          <input type="checkbox" onChange={incrementContor}></input>
          <label>Is Product Tradable</label>
        </div>


        <div className="user-box">
          <label>Expiration Date</label>
          <br></br><br></br>
          <DatePicker
            selected={startDate}
            onChange={date => {
              setStartDate(date)
            }}
            selectsStart // tells this DatePicker that it is part of a range*
            startDate={startDate}
          />
        </div>


        <div className="user-box">
          <label style={{ color: "#54b3d6" }}>Is Product Tradable</label>
          <br></br><br></br>
          <select name="Categorie" id="comboA" onChange={(e) => { setCategorie(e.target.value) }}>
            <option value="Meat" >Meat</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
          </select>
        </div>
        <br></br>
        <br></br>


        <div className="user-box">
          <input
            type="number" step=".01"
            placeholder="Enter quantity" onChange={(e) => { setCantitate(e.target.value) }}
          //value={password}
          //onChange={(e) => setPassword(e.target.value)}
          ></input>
          <label>Quantity</label>
        </div>


        <div className="user-box">
          <label style={{ color: "#54b3d6" }}>Unit of Measure</label>
          <br></br><br></br>
          <select name="Categorie" id="categorie" onChange={(e) => { setunitsOfMeasure(e.target.value) }}>
            <option value="Kilograms">Kilograms</option>
            <option value="Liters">Liters</option>
          </select>
        </div>
        <br></br>
        <div className="uploadPicFood">
          <label style={{ color: "#54b3d6" }}>Food Photo</label>
          <input type="file" onChange={(event) => { setFoodPhoto(event.target.files[0]) }} />
        </div>
        <br></br>
        <br></br>




        <a href="#" style={{ marginLeft: 50 }} onClick={() => {

          if (productDescription.length > 1 && foodPhoto) {
            console.log(auth.currentUser.uid, auth.currentUser.email, auth.currentUser.displayName);


            console.log("Descriere: " + productDescription + "\nE schimbabil: " + !isTradable + "\nDate: " + Date.parse(startDate)
              + "\nCategorie: " + categorie +
              "\nCantitate: " + parseFloat(cantitate) +
              "\nUnits Of Measure: " + unitsOfMeasure);

            let IDUNIC_qty = uuidv4();
            let QtyObj = {
              "type": unitsOfMeasure,
              "units": parseFloat(cantitate),
              "identificator": IDUNIC_qty
            };


            let UserInfolink = 'http://localhost:3030/api/users/' + auth.currentUser.uid;

            axios
              .get(UserInfolink, {})
              .then((data) => {
                //Detaliile userului
                console.log(data.data);

                //Postez Cantitatea
                axios
                  .post("http://localhost:3030/api/quantities/", QtyObj)
                  .then(function (response) { })
                  .catch(function (error) {
                    alert("Error when adding new Qty " + error.message);
                  });

                //Pentru acea cantitate trebuie sa postez produsul care are detaliile userului
                // console.log(data.data.photoUrl);

                let ProductObject = {
                  "idUser": data.data.id,
                  "address": data.data.address.length > 1 ? data.data.address : "Empty",
                  "photoURL": data.data.photoUrl.length > 1 ? data.data.photoUrl : "Empty",
                  "description": productDescription,
                  "forTrade": !isTradable,
                  "expDate": Date.parse(startDate),
                  "status": 1,
                  "category": categorie,
                  "quantity_id": IDUNIC_qty
                }

                //postez intai poza produsului:
                const imgRefFood = ref(storage, `FoodPics/${v4() + '_' + foodPhoto.name}`);
                uploadBytes(imgRefFood, foodPhoto).then(() => {
                  //dupa upload ii iau linkul
                  getDownloadURL(imgRefFood).then((res) => {
                    ProductObject.photoURL = res;
                    console.log(ProductObject)
                    //Postez produsul
                    axios
                      .post("http://localhost:3030/api/products/", ProductObject)
                      .then(function (response) { })
                      .catch(function (error) {
                        alert("Error when adding new Product " + error.message);
                      });
                    setTimeout(() => { navigate("../authenticated", { replace: true }); }, 500)
                  })
                });

              });
          }
          else {
            alert("Trebuie sa introduceti un nume pentru aliment si poza");
          }
        }}>
          Add Product
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </a>

        <br></br>
        <br></br>
        <br></br>
        <a id="alreadyHaveAccount" href="/authenticated">Changed your mind?</a>

      </form>
    </div>


  )
}

export default AddProduct