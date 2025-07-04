import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, FlatList, ScrollView, Alert} from 'react-native';
import {apiService, API} from '../../api/endpoints';

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

    // Fetch products, orders, stats
    useEffect(() => {
        fetchProducts();
        fetchOrders();
        fetchStats();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await apiService.request(API.products.getAll);
            setProducts(res);
        } catch (err) {
            Alert.alert('Error', 'Failed to fetch products');
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await apiService.request(API.orders.getAll);
            setOrders(res);
        } catch (err) {
            Alert.alert('Error', 'Failed to fetch orders');
        }
    };

    const fetchStats = async () => {
        try {
            const sales = await apiService.request(API.orders.getTotalSales);
            setTotalSales(sales.totalSales || 0);
            const count = await apiService.request(API.orders.getOrderCount);
            setOrdersCount(count.orderCount || 0);
        } catch (err) {
            Alert.alert('Error', 'Failed to fetch stats');
        }
    };

    const handleAddProduct = async () => {
        try {
            await apiService.request(API.products.add, {
                method: 'POST',
                body: JSON.stringify(product),
            });
            Alert.alert('Success', 'Product added!');
            setProduct({
                name: '',
                description: '',
                price: '',
                category: '',
                countInStock: '',
                brand: '',
            });
            fetchProducts();
        } catch (err) {
            Alert.alert('Error', 'Failed to add product');
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await apiService.request(API.products.delete(id), {method: 'DELETE'});
            Alert.alert('Deleted', 'Product deleted');
            fetchProducts();
        } catch (err) {
            Alert.alert('Error', 'Failed to delete product');
        }
    };

    const handleUpdateOrderStatus = async (id, status) => {
        try {
            await apiService.request(API.orders.updateStatus(id), {
                method: 'PUT',
                body: JSON.stringify({status}),
            });
            Alert.alert('Success', 'Order status updated');
            fetchOrders();
        } catch (err) {
            Alert.alert('Error', 'Failed to update order');
        }
    };

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
                    <View style={styles.card}>
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

