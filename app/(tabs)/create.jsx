import { howToCreateEvent } from "@/assets/local-data/how-to-create-event";
import { themeColors } from "@/utils/theme.utils";
import { useState } from "react";
import { Text,StyleSheet, View, StatusBar, ScrollView, TextInput, Button, TouchableOpacity, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatTimeStampToDate } from "@/utils/format-date.utils";


export default function Create(){
    const [title, setTitle]=useState("");
    const [description, setDescription]=useState("");
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false)
    const onChange = (selectedDate)=>{
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShowPicker(false)
    }
   
    

    return(
        <SafeAreaView style={styles.main}>
            <Text className="text-black text-4xl font-bold">Create an event</Text>
        <ScrollView contentContainerStyle={{gap:16}}>
            {/* event creation form */}
            <View>
                <View className="flex gap-4 bg-white rounded-md p-3 ">
                    <Text className="text-md text-neutral-500">Event title</Text>
                    <TextInput
                    style={styles.input}
                    placeholder="title of your event"
                    value={title}
                    onChangeText={(text) => setTitle (text)}/>
                </View>

                <View className="flex gap-4 bg-white rounded-md p-3 ">
                    <Text className="text-md text-neutral-500">Event description</Text>
                    <TextInput
                    multiline={true}
                    style={styles.textarea}
                    placeholder="title of your event"
                    value={description}
                    onChangeText={(text) => setDescription (text)}/>
                </View>

                <View>
                    <TouchableOpacity 
                    onPress={()=>setShowPicker(true)}
                    style={{
                        backgroundColor:themeColors.darkGray,
                        borderRadius:50,
                        paddingHorizontal:16,
                        paddingVertical:8,
                    }}
                    className="flex flex-row justify-between items-center">
                        <Text className="font-bold text-lg text-white">{formatTimeStampToDate(date)}</Text>
                        <Text className="font-bold text-2xl text-white">Select event date</Text>
                    </TouchableOpacity>
                     {showPicker && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        mode="date"
                        value={date}
                        onChange={onChange}/>
                     )}
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
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 12,
    },
    input:{
        borderWidth: 2,
        borderColor:themeColors.darkGray,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius:50,
        fontSize:20,
    },
    textarea:{
        borderWidth: 1,
        borderColor:themeColors.darkGray,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius:8,
        fontSize:20,
    }

    
})
