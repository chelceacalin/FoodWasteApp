import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from '../../firebase.js'
import { useNavigate } from 'react-router-dom';
import './RightContent.css'
import FoodCard from "./FoodCard.jsx";
import axios from 'axios';
import { Product } from "../../models/product.js";
const RightContent = (props) => {
    let statusList = ['reserved', 'available', 'sold']
    const [foods, setFoods] = useState(null);
    const [users, setUsers] = useState(null);
    const [quantities, setQuantities] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:3030/api/products')
            .then((resp) => {
                setFoods(resp.data);
                console.log('produse:', resp.data)
            })
        axios.get('http://localhost:3030/api/users')
            .then((resp) => {
                setUsers(resp.data)
                console.log('useri:', resp.data)
            })
        axios.get('http://localhost:3030/api/quantities')
            .then((resp) => {
                setQuantities(resp.data)
                console.log('cantitati:', resp.data)
            })
    }, [])

    const stateModified = () => {
        axios.get('http://localhost:3030/api/products')
            .then((resp) => {
                setFoods(resp.data);
                console.log('produse:', resp.data)
            })
    }

    return (
        <div className="rightContent">
            <div className="rightContentMenu">
                <button onClick={() => { props.setOwningFilter('none') }} style={{ backgroundColor: props.owningFilter === 'none' ? '#bff7ab' : '#ffffff' }}>Toate produsele</button>
                <button onClick={() => { props.setOwningFilter('own') }} style={{ backgroundColor: props.owningFilter === 'own' ? '#bff7ab' : '#ffffff' }}>Produsele mele</button>
                <button> Produsele mele rezervate</button>
            </div>
            <div className="rightContentInfo">
                {
                    (foods && users && quantities) ?
                        foods.map((f) => {

                            let product = new Product;
                            product = {...f};

                            if (props.owningFilter === 'own' && f.idUser === auth.currentUser.uid) {
                                console.log("da")
                                if (props.filter !== 'none' && f.category === props.filter) {
                                    if (props.availableFilter !== 'none' && f.status == statusList.indexOf(props.availableFilter)) {
                                        //randeaza cu filtru 1 si 2
                                        return (
                                            <FoodCard
                                                stateModified={stateModified}
                                                product={f}
                                                key={f.id}
                                                user={users.find((u) => u.id === f.idUser)}
                                                quantity={quantities.find((q) => q.identificator === f.quantity_id)}
                                            />
                                        )
                                    } if (props.availableFilter === 'none') {
                                        //randeaza doar cu filtru 1
                                        return (
                                            <FoodCard
                                                stateModified={stateModified}
                                                product={f}
                                                key={f.id}
                                                user={users.find((u) => u.id === f.idUser)}
                                                quantity={quantities.find((q) => q.identificator === f.quantity_id)}
                                            />
                                        )
                                    }
                                }
                                if (props.filter === 'none') {
                                    if (props.availableFilter !== 'none' && f.status == statusList.indexOf(props.availableFilter)) {
                                        //randeaza cu filtru 2
                                        return (
                                            <FoodCard
                                                stateModified={stateModified}
                                                product={f}
                                                key={f.id}
                                                user={users.find((u) => u.id === f.idUser)}
                                                quantity={quantities.find((q) => q.identificator === f.quantity_id)}
                                            />
                                        )
                                    }
                                    if (props.availableFilter === 'none') {
                                        return (
                                            <FoodCard
                                                stateModified={stateModified}
                                                product={f}
                                                key={f.id}
                                                user={users.find((u) => u.id === f.idUser)}
                                                quantity={quantities.find((q) => q.identificator === f.quantity_id)}
                                            />
                                        )
                                    }

                                }
                            }
                            if (props.owningFilter === 'none') {
                                if (props.filter !== 'none' && f.category === props.filter) {
                                    if (props.availableFilter !== 'none' && f.status == statusList.indexOf(props.availableFilter)) {
                                        //randeaza cu filtru 1 si 2
                                        return (
                                            <FoodCard
                                                stateModified={stateModified}
                                                product={f}
                                                key={f.id}
                                                user={users.find((u) => u.id === f.idUser)}
                                                quantity={quantities.find((q) => q.identificator === f.quantity_id)}
                                            />
                                        )
                                    } if (props.availableFilter === 'none') {
                                        //randeaza doar cu filtru 1
                                        return (
                                            <FoodCard
                                                stateModified={stateModified}
                                                product={f}
                                                key={f.id}
                                                user={users.find((u) => u.id === f.idUser)}
                                                quantity={quantities.find((q) => q.identificator === f.quantity_id)}
                                            />
                                        )
                                    }
                                }
                                if (props.filter === 'none') {
                                    if (props.availableFilter !== 'none' && f.status == statusList.indexOf(props.availableFilter)) {
                                        //randeaza cu filtru 2
                                        return (
                                            <FoodCard
                                                stateModified={stateModified}
                                                product={f}
                                                key={f.id}
                                                user={users.find((u) => u.id === f.idUser)}
                                                quantity={quantities.find((q) => q.identificator === f.quantity_id)}
                                            />
                                        )
                                    }
                                    if (props.availableFilter === 'none') {
                                        return (
                                            <FoodCard
                                                stateModified={stateModified}
                                                product={f}
                                                key={f.id}
                                                user={users.find((u) => u.id === f.idUser)}
                                                quantity={quantities.find((q) => q.identificator === f.quantity_id)}
                                            />
                                        )
                                    }

                                }
                            }
                        })
                        : null
                }
            </div>
        </div>
    )
}

export default RightContent