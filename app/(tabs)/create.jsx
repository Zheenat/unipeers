import { howToCreateEvent } from "@/assets/local-data/how-to-create-event";
import { themeColors } from "@/utils/theme.utils";
import { useEffect, useState } from "react";
import { Text,StyleSheet, View, StatusBar, ScrollView, TextInput, Button, TouchableOpacity, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatTimeStampToDate } from "@/utils/format-date.utils";
import { schools } from "@/assets/local-data/school-list";
import RNPickerSelect from "@react-native-picker/picker"



export default function Create(){
    const [title, setTitle]=useState("");
    const [description, setDescription]=useState("");
    const [schoolOptions, setschoolOptions] = useState([])
    const [selectedSchool, setSelectedSchool] = useState("")
    const [venue, setVenue] = useState("")
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false)

    
// Make a simple list of school
useEffect(()=>{
    const list=[];
    schools.forEach(item => list.push(item.title))
    setschoolOptions(list);
},[])


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
            <View className="flex gap-4 bg-white rounded-md p-3">
                <View>
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
                    style={styles.input}
                    placeholder="title of your event"
                    value={description}
                    onChangeText={(text) => setDescription (text)}/>
                </View>

                <View>
                    <TouchableOpacity 
                    onPress={()=>setShowPicker(true)}
                    style={styles.picker}
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
                <View>
                 <Text className="text-md text-neutral-500">Event venue</Text>
                    <TextInput
                    style={styles.input}
                    placeholder="exact event venue"
                    value={venue}
                    onChangeText={(text) => setVenue (text)}/>
                </View>
                {schoolOptions.length > 0 &&
                <View>
                    <Text>Choose school where event will be held</Text>
                    <RNPickerSelect
                    items={schoolOptions}
                    onValueChange={(value)=> setSelectedSchool(value)}/>
                </View>}
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
        borderWidth: 1,
        borderColor:themeColors.gray200,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius:8,
        fontSize:20,
    },
picker:{

        backgroundColor:themeColors.darkGray,
        borderRadius:8,
        paddingHorizontal:16,
        paddingVertical:8, 
}

    
})
