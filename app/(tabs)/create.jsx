import { howToCreateEvent } from "@/assets/local-data/how-to-create-event";
import { themeColors } from "@/utils/theme.utils";
import { useState } from "react";
import { Text,StyleSheet, View, StatusBar, ScrollView, TextInput, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Create(){
    const [title, setTitle]=useState("");
    console.log(title);
    

    return(
        <SafeAreaView style={styles.main}>
            <Text className="text-black text-4xl font-bold">Create an event</Text>
        <ScrollView contentContainerStyle={{gap:16}}>
            {/* event creation form */}
            <View>
                <View className="flex gap-4 bg-white rounded-md p-3 ">
                    <Text className="text-sx text-neutral-500">Event title</Text>
                    <TextInput
                    style={styles.input}
                    placeholder="title of your event"
                    value={title}
                    onChangeText={(text) => setTitle (text)}/>
                </View>
            </View>
            {/* how to craete event-documentation */}
            <View className="flex gap-4 bg-white rounded-md p-3 ">
                {howToCreateEvent.map(item => (
                    <View key={item.title}>
                        <Text className="font-bold">{item.title}</Text>
                        <Text className="text-neutral-700">{item.doc}</Text>
                    </View>

                ))}
            </View>
            </ScrollView>
        </SafeAreaView>
        )
    }
 const styles =StyleSheet.create({
    main: {
        flex:1, 
        gap:16,
        backgroundColor: themeColors.lightGreen,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 12,
    },
    input:{
        borderWidth: 2,
        borderColor:themeColors.lightGreen,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius:50,
        fontSize:20,
    }
    
})
