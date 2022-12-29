

function addProduct() {
  return (

    <div className="login-box">
    <h1 id="textColorForLoginCreate">Add Product</h1>
    <form >
      <div className="user-box">
        <input
          type="text"
          placeholder="Product Description"
          //value={email}
          //onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label>Description</label>
      </div>

      <div className="user-box">
        <input type="checkbox" ></input>
        <label>Is Product Tradable</label>
      </div>

      <div className="user-box">
        <input
          type="date"
         // value={address}
          //onChange={(e) => setAddress(e.target.value)}
        ></input>

        <label>Expiration Date</label>
      </div>


      <div className="user-box">
      <label style={{color:"#54b3d6"}}>Is Product Tradable</label>
    <br></br><br></br>
      <select name="Categorie" id="categorie">
      <option value="volvo">Carne</option>
      <option value="saab">Fructe</option>
      <option value="saab">Legume</option>
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
    



      <a href="#" style={{marginLeft:50}}>
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

export default addProduct