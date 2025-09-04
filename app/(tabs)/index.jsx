import { useEffect, useState,  } from "react";
import { EventSnippet } from "@/components/EventSnippet";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {Seperator} from "@/components/ListSeperator";
import { db } from "@/config/firebase.config";
import { getDocs,collection,query,orderBy } from "firebase/firestore";
import { themeColors } from "@/utils/theme.utils";

export default function Index () {
  const [events, setEvent] = useState([])

  //fetch events from database
  useEffect(()=> {
    const handleFetchData = async()=>{
      const receivedData=[]
      const onSnap = await getDocs(collection(db,"events"));
      onSnap.docs.forEach(doc =>receivedData.push({
        id:doc.id,
        data: doc.data()
      }));

      setEvent(receivedData)
    }

    handleFetchData()
  },[]);

  if (events.length > 0) {
      return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
        data={events}
        ItemSeparatorComponent={() => (<Seperator h = {32} w={0}/>)}
        renderItem={({item}) => {
          return (
            <EventSnippet data={item.data}/>
          )
        }}
        keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
    
  } else {
      return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.emptyWrapper}>
       <ActivityIndicator size="large" color={themeColors.darkGreen}/>
      </SafeAreaView>
    </SafeAreaProvider>
  )
  }
}

const styles = StyleSheet.create({
  emptyWrapper: {
    flex:1,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"

  },

})