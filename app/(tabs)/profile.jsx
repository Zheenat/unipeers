import { Seperator } from "@/components/ListSeperator";
import { db } from "@/config/firebase.config";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { UserEventSnippet} from "@/components/UserEventSnippet"

const screenWidth = Dimensions.get("window").width - 24 - 16 - 4;

export default function Profile(){
    let user = "anonymous"
    const [userEvents, setUserEvents] = useState([])
    
    useEffect(() => {
        const handleFetchUserEvents = async () => {
            const reData = [];
            const q = query(
                collection(db, "events"),
                where("createdBy", "==", user)

            );
            const onSnap = await getDocs(q)
            onSnap.docs.forEach(doc => reData.push({
                id: doc.id,
                data: doc.data()
            }));
            setUserEvents(reData)
        }
        // call and execute function
        handleFetchUserEvents()

    },[user]);

    return (
     <SafeAreaProvider>
        <SafeAreaView style={{paddingHorizontal:12}}className="flex gap-6">
            {/* header section */}
            <View className="flex items-center">
                <Image
                style={{width:86, height:86}}
                source={require("../../assets/images/user.png")}
                alt="demo user profile photo"
                />
                <Text className="font-bold ">Ademola Suleiman</Text>
                <Text className="text-stone-600 tracking-widest">@adesule</Text>

                {/* profile actions */}
                 <View className="flex flex-row gap-6 items-center mt-3">
                    <Link href="/" className="  px-3 py-2 rounded-md bg-teal-700">
                    <View className="flex flex-row items-center gap-3">
                        <FontAwesome name="pencil-square-o" size={24} color="white"/>
                        <Text className="text-lg font-semibold text-white">Update Profile</Text>
                    </View>
                    </Link>
                        <Pressable  className=" flex flex-row items-center gap-3 px-3 py-2 rounded-md bg-red-700">
                        <MaterialIcons name="logout" size={24} color="white"/>
                        <Text className="text-lg font-semibold text-white">Sign Out</Text>
                        </Pressable>  
                </View>
            </View>
            {/* body section */}
            <View className="flex gap-3 border border-stone-300 rounded-md p-4">
                <View className="flex flex-row justify-between">
                    <Text className="text-lg text-stone-700 track-wider">Account email</Text>
                    <Text className="text-md text-stone-800">ademola_sule@gmail.com</Text>
                </View>
                <View className="flex flex-row justify-between">
                    <Text className="text-lg text-stone-700 track-wider">Department</Text>
                    <Text className="text-md text-stone-800">Computer Engineering</Text>
                </View>
                <View className="flex flex-row justify-between">
                    <Text className="text-lg text-stone-700 track-wider">Faculty</Text>
                    <Text className="text-md text-stone-800">Engineering</Text>
                </View>
                <View className="flex flex-row justify-between">
                    <Text className="text-lg text-stone-700 track-wider">Institution</Text>
                    <Text className="text-md text-stone-800">Ahmadu Bello University, Zaria</Text>
                </View>
            </View>

            {/* show event by the user */}
            <View>
                <Text style={{ fontSize: 18, marginBottom:16}}>My events</Text>

                <FlatList
                data={userEvents}
                renderItem={({item}) => {
                    return (
                        <UserEventSnippet boxWidth={screenWidth/3} eventData = {item}/>
                    )
                }}
                horizontal={true}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={()=> <Seperator h = {0} w={8}/>}
                />
            </View>     
        </SafeAreaView>
    </SafeAreaProvider>
    )
}