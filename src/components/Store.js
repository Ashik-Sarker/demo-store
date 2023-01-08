import React, { useEffect, useState } from 'react';

const Store = () => {
    const [products, setProducts] = useState([]);

    const username = 'ck_35f64c79ebe2cfd6979b6f81c103ff01135ae1b8'
    const password = 'cs_1dd3842d9bdc656ace99007faef0bb09a4d34400'
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa(username + ":" + password)
        }
    };

    useEffect(() => {
        fetch('https://demostore.mirailit.com/wp-json/wc/v3/products', requestOptions)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    
    return (
        <div>
            <h1>This is store</h1>
        </div>
    );
};

export default Store;