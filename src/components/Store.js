import { createTheme, ThemeProvider } from '@mui/material';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import './styled.css'

const Store = () => {
    const [products, setProducts] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    // const [test, setTest] = useState({
    //     update:[{id:2932, regular_price:'1000'},{id:2931, regular_price:'9000'}]
    // });
    const [test, setTest] = useState({
        update:[]
    });
    // const [reload, setReload] = useState(true);



    const username = 'ck_35f64c79ebe2cfd6979b6f81c103ff01135ae1b8'
    const password = 'cs_1dd3842d9bdc656ace99007faef0bb09a4d34400'
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa(username + ":" + password)
        }
    };


    
    const requestOptions2 = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(username + ":" + password)
        },
        body: JSON.stringify(test)
    }



    useEffect(() => {
        fetch('https://demostore.mirailit.com/wp-json/wc/v3/products', requestOptions)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    

    const handlePrice = (e, row) => {

        let newUpdate = [...test.update];
        console.log('into',newUpdate);

        if (newUpdate.length > 0) {
            console.log('length > 0');
            
            let count = 0;
            newUpdate.map(item => {
                if (item.id === row.id) {
                    console.log("item match");
                    item.regular_price = e.target.value;
                    count = 1;
                }
            })
            if(count === 0){
                console.log('item not matching');
                let temp = { id: row.id, regular_price: e.target.value }
                newUpdate.push(temp)
            }
            
        } else {
            console.log("length = 0");
            let temp = { id: row.id, regular_price: e.target.value }
            newUpdate.push(temp)
        }

        setTest({update:newUpdate})

        

        const newProducts = [...products];
        newProducts.map((product) => {

            if (product.id === row.id) {
                product.price = e.target.value;
            }
        });
        setProducts(newProducts);
    }

    const submitData = () => {
        console.log('submit');
        fetch('https://demostore.mirailit.com/wp-json/wc/v3/products/batch' , requestOptions2)
        .then(res => res.json())
        .then(status => console.log(status))
    }

    const defaultMaterialTheme = createTheme();

    const columns = [
        {
            title: "SL", field: "", render: (row) => <div>{row.tableData.id + 1}</div>,
            width: "20 !important",
            cellStyle: {
                textAlign: "center",
            },
        },
        {
            title: "Name", field: `requisition_no`, render:(row)=> 
            <p>{row.name}</p>
        },
        {
            title: "Image", field: `requisition_no`, render:(row)=> 
            <img width='120px' height='50px' src={row.images[0].src} alt="" srcset="" />
        },
        {
            title: "Price", field: `requisition_no`, render:(row)=> 
            <input 
                disabled={isDisabled}
                type="number" 
                style={{height:'30px'}}
                value={row.price}
                onChange={(e) => handlePrice(e, row)}
            />
        },
    ];

    console.log(test);
    
    return (
        <div style={{marginBottom:'20px'}}>
            <div style={{ maxWidth: "90%", margin: 'auto', marginTop: '20px', display: 'flex',        alignItems:'center'}} className="custom-card">
                <div style={{flexGrow:'1'}}>
                    <h2 style={{padding:'0px', marginLeft:'10px'}}>Product List</h2>
                </div>
                <div style={{marginRight:'20px'}}>
                    <button style={{padding:'14px', background:'blue', color:'white', fontWeight:'600', fontSize:'16px', letterSpacing:'2px', border:'0px', borderRadius:'4px', cursor:'pointer'}} 
                    onClick={() => setIsDisabled(!isDisabled)}
                    >Edit Price</button>
                </div>
            </div>
            <div style={{ maxWidth: "90%", margin:'auto'}}>
                <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        // title = {<div style={{fontWeight:'bold', fontSize:'20px'}}>Product List</div>}
                        columns={columns}
                        data={products}
                        // isLoading= {spinner ? true : false}
                        options={{
                            search: false,
                            showTitle: false,
                            searchFieldAlignment: "left",
                            pageSize: 5,
                            emptyRowsWhenPaging: false,
                            // paging: false,
                            pageSizeOptions: [2, 5, 10, 20, 50, 100]
                        }}

                    />
                </ThemeProvider>
            </div>
            <div style={{ maxWidth: "90%", marginLeft:'87%'}}>
                <button 
                    style={{padding:'14px', background:'blue', color:'white', fontWeight:'600', fontSize:'16px', letterSpacing:'2px', border:'0px', borderRadius:'4px', cursor:'pointer', marginTop:'16px'}} 
                    onClick={submitData}
                    >Submit</button>
            </div>
        </div>
    );
};

export default Store;