import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from '../../firebase.js'
import { useNavigate } from 'react-router-dom';
import './RightContent.css'
import FoodCard from "./FoodCard.jsx";
import axios from 'axios';
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
    return (
        <div className="rightContent">
            <div className="rightContentMenu">
                <button>Toate produsele</button>
                <button onClick={props.navToProduseleMele}>Produsele mele</button>
                <button> Produse rezervate</button>
            </div>
            <div className="rightContentInfo">
                {
                    (foods && users && quantities) ?
                        foods.map((f) => {
                            console.log(props.availableFilter)
                            if (props.filter !== 'none' && f.category === props.filter) {
                                if (props.availableFilter !== 'none' && f.status == statusList.indexOf(props.availableFilter)) {
                                    //randeaza cu filtru 1 si 2
                                    return (
                                        <FoodCard
                                            key={f.id}
                                            user={users.find((u) => u.id === f.idUser)}
                                            quantity={quantities.find((q) => q.identificator === f.quantity_id)}
                                            address={f.address}
                                            description={f.description}
                                            expDate={f.expDate}
                                            category={f.category}
                                            status={f.status}
                                        />
                                    )
                                } if (props.availableFilter === 'none') {
                                    //randeaza doar cu filtru 1
                                    return (
                                        <FoodCard
                                            key={f.id}
                                            user={users.find((u) => u.id === f.idUser)}
                                            quantity={quantities.find((q) => q.identificator === f.quantity_id)}
                                            address={f.address}
                                            description={f.description}
                                            expDate={f.expDate}
                                            category={f.category}
                                            status={f.status}
                                        />
                                    )
                                }
                            }
                            if (props.filter === 'none') {
                                if (props.availableFilter !== 'none' && f.status == statusList.indexOf(props.availableFilter)) {
                                    //randeaza cu filtru 2
                                    return (
                                        <FoodCard
                                            key={f.id}
                                            user={users.find((u) => u.id === f.idUser)}
                                            quantity={quantities.find((q) => q.identificator === f.quantity_id)}
                                            address={f.address}
                                            description={f.description}
                                            expDate={f.expDate}
                                            category={f.category}
                                            status={f.status}
                                        />
                                    )
                                }
                                if (props.availableFilter === 'none') {
                                    return (
                                        <FoodCard
                                            key={f.id}
                                            user={users.find((u) => u.id === f.idUser)}
                                            quantity={quantities.find((q) => q.identificator === f.quantity_id)}
                                            address={f.address}
                                            description={f.description}
                                            expDate={f.expDate}
                                            category={f.category}
                                            status={f.status}
                                        />
                                    )
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