import { Button, SafeAreaView, Text } from "react-native";

const Feed = ({ navigation }: any) =>  {




    return(<SafeAreaView>
        <Button        title="Go to Login"
          onPress={() => navigation.navigate("Login")} />
            <Text> This is Feed Screen!</Text></SafeAreaView>)
}
export default Feed
