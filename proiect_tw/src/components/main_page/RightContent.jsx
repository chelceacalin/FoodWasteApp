import axios from 'axios';
import { useEffect, useState } from "react";
import auth from '../../firebase.js';
import { Product, ProductStatus } from "../../models/product.js";
import FoodCard from "./FoodCard.jsx";
import './RightContent.css';
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

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    const myFiltered = () => {
        //IAU TOATE PRODUSELE PT USERUL MEU
        axios.get('http://localhost:3030/api/products/')
            .then((produs) => {
                //setFoods(resp.data);
                axios.get('http://localhost:3030/api/reservations/user/' + auth.currentUser.uid)
                    .then((rezervare) => {
                        console.log('Rezervarile mele:', rezervare.data)
                        console.log(' PRODUSE:', produs.data)


                        let rezervari = rezervare.data;
                        let validId = auth.currentUser.uid;
                        let arrDeLaCine = [];
                        rezervari.forEach(r=>{
                            if(r.cineRezerva === validId){
                                arrDeLaCine.push(r.cineRezerva);
                            }
                        })
                        //ACUM  AVEM TOATE ID-URILE UNICE pentru care trebuie sa luam produsele
                        let unique = arrDeLaCine.filter(onlyUnique);
                        console.log("unique: " + unique);

                        let produse = produs.data;
                        let ArrayObjects = [];
                        for (let j of produse) {
                            if ((unique.includes(j.idUser)) && unique.length > 0 && j.idUser !== validId) {
                                //console.log(j);
                                if (j.status === ProductStatus.RESERVED) {
                                    ArrayObjects.push(j);
                                }

                            }
                        }
                        setFoods(ArrayObjects);
                    }).catch((err) => console.log(err));
            }).catch((err) => { console.log(err) })
    }

    return (
        <div className="rightContent">
            <div className="rightContentMenu">
                <button onClick={() => {
                    stateModified();

                    props.setOwningFilter('none')
                }

                } style={{ backgroundColor: props.owningFilter === 'none' ? '#bff7ab' : '#ffffff' }}

                >All Products</button>
                <button onClick={() => {
                    props.setOwningFilter('own')
                    stateModified()
                }} style={{ backgroundColor: props.owningFilter === 'own' ? '#bff7ab' : '#ffffff' }}>My Products</button>
                <button onClick={() => {
                    myFiltered();
                    props.setOwningFilter('own_reserved')
                }}
                    style={{ backgroundColor: props.owningFilter === 'own_reserved' ? '#bff7ab' : '#ffffff' }}
                > My Reserved Products</button>
            </div>
            <div className="rightContentInfo">
                {
                    (foods && users && quantities) ?
                        foods.map((f) => {

                            let product = new Product;
                            product = { ...f };
                            // console.log(product);
                            //  console.log(f);
                            if (props.owningFilter === 'own_reserved') {
                                return (
                                    <FoodCard
                                        stateModified={myFiltered}
                                        product={f}
                                        key={f.id}
                                        user={users.find((u) => u.id === f.idUser)}
                                        quantity={quantities.find((q) => q.identificator === f.quantity_id)}
                                    />
                                )
                            }
                            else

                                if ((props.owningFilter === 'own') && f.idUser === auth.currentUser.uid) {
                                    // console.log('apasat 1');


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