import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, FlatList, ScrollView, Alert} from 'react-native';

export default function AdminDashboardPanel() {
    const [product, setProduct] = useState({
        name:'', 
        description:'',
        price:'',
        category:'',
        countInStock:'',
        brand:'',
    });


    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [ordersCount, setOrdersCount] = useState(0);


    // we define a function to fetch the products from the database

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Admin Dashboard</Text>

            {/* Add product Section */}
            <Text style={styles.subHeader}>Add Product</Text>
            {['name', 'description', 'price', 'category', 'countInStock', 'brand'].map((field) => (
                 <TextInput
                 key={field}
                 placeholder={field}
                 style={styles.input}
                 value={product[field]}
                 onChangeText={(text) => setProduct({...product, [field]: text})}
                 />  
            ))}
            <Button title="Add Product" onPress={handleAddProduct} />

            {/* Products List */}
            <Text style={styles.subHeader}>Products</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    <View style={style.caed}>
                        <Text>{item.name}</Text>
                        <Text>${item.price}</Text>
                        <Button title="Delete" onPress={() => handleDeleteProduct(item._id)} />
                    </View>
                )}
            />

            {/* Order List */}
            <Text style = {styles.subHeader}>Orders</Text>
            <FlatList
                data={orders}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    <View style={styles.card}>
                        <Text>Order by:{item.user?.name}</Text>
                        <Text>Status:{item.status}</Text>
                        <Button title="Mark as Delivered" onPress={() => handleUpdateOrderStatus(item._id, 'delivered')} />
                    </View>
                )}
            />

            {/* Stats */}
            <View style ={styles.stats}>
                <Text>Total Sales: ₹{totalSales}</Text>
                <Text>Total Orders: {ordersCount}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container:{
        padding: 20,
    },
    header:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subHeader:{
        fontSize: 18,
        marginTop: 20,
    },
    input:{
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    card:{
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    stats:{
        marginTop: 30,
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 5,
    },
});

