import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddProduct=()=> {
const [productDescription, setproductDescription] = useState("Empty");
const [isTradable, set_isTradable] = useState(true);
const [contor,setContor]=useState(1);
const [startDate, setStartDate] = useState(new Date());
const [categorie,setCategorie]=useState("Carne");

let incrementContor=()=>{
    setContor((cnt)=>{
        if(cnt%2==0){
          set_isTradable(true);
        }
        else{
            set_isTradable(false);
        }
        return cnt+1;
    })
}





  return (

    <div className="login-box">
         
    <h1 id="textColorForLoginCreate">Add Product</h1>
    <form >
      <div className="user-box">
        <input
          type="text"
          placeholder="Product Description"
            value={productDescription!==null?productDescription:"Adauga Produs"}    
          onChange={(e) => setproductDescription(e.target.value)}
        ></input>
        <label>Description</label>
      </div>




      <div className="user-box">
        <input type="checkbox"  onChange={incrementContor}></input>
        <label>Is Product Tradable</label>
        


      </div>
    
    
    
    
    
      <div className="user-box">
      <label>Expiration Date</label>
      <br></br><br></br>

      <DatePicker
     selected={startDate}
     onChange={date => {setStartDate(date)
           
    }}
     selectsStart // tells this DatePicker that it is part of a range*
     startDate={startDate}
   />
      </div>


      <div className="user-box">
      <label style={{color:"#54b3d6"}}>Is Product Tradable</label>
    <br></br><br></br>
      <select name="Categorie" id="comboA" onChange={(e)=>{setCategorie(e.target.value)}}>
      <option value="Carne" >Carne</option>
      <option value="Fructe">Fructe</option>
      <option value="Legume">Legume</option>
        </select>
        </div>
        <br></br>
        <br></br>
    
    
    
    
      <div className="user-box">
        <input
          type="text"
          placeholder="Enter quantity"
          //value={password}
          //onChange={(e) => setPassword(e.target.value)}
        ></input>
        <label>Cantitate</label>
      </div>


      <div className="user-box">
      <label style={{color:"#54b3d6"}}>Unit of Measure</label>
    <br></br><br></br>
      <select name="Categorie" id="categorie">
      <option value="volvo">Kilograms</option>
      <option value="saab">Liters</option>
        </select>
        </div>
        <br></br>
        <br></br>
    



      <a href="#" style={{marginLeft:50}} onClick={()=>{


        console.log("Descriere: "+productDescription+ "\nE schimbabil: "+!isTradable+"\nDate: "+Date.parse(startDate)
        +"\nCategorie: "+categorie);





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