import { useEffect, useState } from 'react';
import { Text, Button, View, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet  } from 'react-native'
import { fetching } from '../Services/fetch';

const Categories = ({ navigation }) => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    (async () => {
      const data = await fetching('https://fakestoreapi.com/products/categories');
      setCategories(data);
    })()

  }, [])

  const handleCategory = (categoryID) => {
    //console.log(categoryID);
    navigation.navigate('Products', {
      category: categoryID
    })
  }

  return (
    <View style={styles.viewstyle}>
      {categories.length !== 0 ? 
        <FlatList
          data={categories}
          renderItem={( {item} ) => {
            return <TouchableOpacity
              onPress={() => handleCategory(item)}
            >
             <View style={styles.viewtwostyle}>
              <Text style={styles.text}>
                {item}  
              </Text>
              
              </View>
            </TouchableOpacity>
          }
          }
          keyExtractor={item => item.toString()}
        />
        :
        <ActivityIndicator size={"large"} color={"blue"}/>
      }
    </View>
  )
} 

export default Categories

const styles = StyleSheet.create({
  viewstyle: {
    flex: 1,
    backgroundColor: "#F7DBF7",
    flexDirection:'row',
  
 
   
  },
  viewtwostyle : {
  width: 140,
  backgroundColor: "#AEA0AE",
  height: 140,
  marginTop:15,
  marginLeft:10,
  


  shadowColor: '#171717',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 5,
  
    justifyContent:'center'
  

  },
 
  text: {
   
  
    textAlign:'center',
    textTransform:'capitalize',
    fontSize:15,
    

  }

  
});